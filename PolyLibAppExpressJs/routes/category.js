var express = require('express')
var router = express.Router();
var Category = require('../models/category');
const Book = require('../models/book');


//get
router.get('/get-categories', (req, res) => {
    Category.find().populate('books.book')
        .then((category) =>{
            res.status(201).json(category)
        })
        .catch((err) =>{
            res.status(500). json({message: 'Get category failed' + err});
        })
})

//post
router.post('/add-category', (req, res) => {
    const { name } = req.body;
    const category = new Category({
        name
    });
    category.save()
        .then((saveCategory) =>{
            res.status(201).json({
                message: 'Category created successfully',
                category: saveCategory,
            })
        })
        .catch((err) =>{
            res.status(500).json({message: 'Category created failed: ' + err});
        })

})

//put
router.put('/update-category/:id', (req, res) => {
    const { name } = req.body;
    const id = req.params.id;

    Category.findById(id)
    .then((category) =>{
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        category.name = name;

        return Book.find({ idCategory: id})
            .then((book) =>{
                const savePromises = book.map((book) =>{
                    book.idCategory = category._id;
                    return book.save();
                });
                return Promise.all(savePromises);
            }).then(() => {
                return category.save();
            });
    }).then((updatedCategory) =>{
        res.status(200).json({message: 'Category updated successfully', category: updatedCategory});
    }).catch((err) =>{
        res.status(500).json({message: 'Category created failed: ' + err});
    })
})

//delete
router.delete('/delete-category/:id',  async (req, res) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found'});
        }

        const books = await Book.find({ idCategory: id});

        await Promise.all(books.map((book) =>{
            Book.deleteOne({ _id: book._id })
        }));

        await Category.deleteOne({ _id: category._id });

        res.status(200).json({message: 'Category deleted successfully'});

    } catch (e) {
        res.status(500).json({message: 'Delete category failed: ' + err});
    }
})

module.exports = router;
