var express = require('express');
var router = express.Router();
var BorrowTicket = require('../models/borrow');
var User = require('../models/user');
var Category = require('../models/category');
var Book = require('../models/category');

// post
router.post('/add-borrow-ticket', async (req, res) => {
    const { date, price, idUser, idBook } = req.body;

    try {
        const newTicket = new BorrowTicket({
            date,
            price,
            idUser,
            idBook,
        });

        const loadData = await newTicket.save();
        res.status(201).json({ message: 'Loan created succesfully', borrowTicket : loadData });
    } catch (err) {
        res.status(500).json({message: 'Create Borrow Ticket Failed : ' + err })
    }
});

//get

router.get('/get-borrow-ticket', (req, res) => {
    BorrowTicket.find()
        .populate('idBook')
        .then((borrowTicket) =>{
            res.status(201).json(borrowTicket);
        })
        .catch((err) => {
            res.status(500).json({message: 'Get borrow ticket failed ' + err});
        })
});

module.exports = router;
