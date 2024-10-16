var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var Category = require('../models/category')

// Get
router.get('/get-books', (req, res) =>{
    Book.find()
        .then((books)=>{
            res.status(201).json(books);
        })
        .catch((err)=>{
            res.status(500).json({message: 'Get book failed: ' + err})
        })
})

//Post
router.post('/add-book', (req, res)=>{
    const {bookName, author, price, idCategory} = req.body;

    const newBook = new Book({
        bookName,
        author,
        price,
        idCategory
    });

    Category.findById(idCategory)
        .populate('books.book')
        .then((existCategory)=> {
            if(!existCategory){
                return res.status(404).json({message: 'Category not found'});
            }

            const existingBook = existCategory.books.find((obj) => obj.book.bookName === bookName);
            const existingAuthor = existCategory.books.find((obj)=> obj.book.author === author);

            if(existingBook && existingAuthor){
                existingBook.quantity += quantity;

                existCategory.save()
                .then(() => {
                    res.status(201).json({message: 'Book quantity updated successfully'});
                })
                .catch((err) => {
                    res.status(404).json({message: 'Failed to update category: ' + err});
                })
            } else {
                newBook.save()
                    .then((saveBook) => {
                        existCategory.books.push({
                            book: saveBook._id,
                            quantity
                        });

                        existCategory.save()
                            .then(() =>{
                                res.status(201).json({
                                    message: 'Book created and added to category successfully',
                                    book: saveBook
                                });
                            })
                            .catch((err) =>{
                                res.status(500).json({message: 'Failed to update category: ' + err });
                            })
                    })
                    .catch((err) =>{
                        res.status(500).json({message: 'Failed to create book: ' + err });
                    });
            }
        })
        .catch((err) =>{
            res.status(500).json({message: 'Failed to find category: ' + err });
        });
});

module.exports = router;
