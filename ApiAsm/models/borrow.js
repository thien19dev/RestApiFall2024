const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowingRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },
    status: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        require: true,
    },
    idBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        require: true,
    }]

}, {timestamps: true});

const BorrowingRecord = mongoose.model('BorrowingRecord', borrowingRecordSchema);
module.exports = BorrowingRecord;