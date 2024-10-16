const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        unique: true,
    },
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
