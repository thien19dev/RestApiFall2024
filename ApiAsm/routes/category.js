var express = require('express')
var router = express.Router();
var Category = require('../models/category');
const category = require('../models/category');

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

module.exports = router;