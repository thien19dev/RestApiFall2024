const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, 
        require: true,
        unique: true,
    },
    books: [{
        book: {type: Schema.Types.ObjectId,
            ref: 'Book',
            require: true,
        }
    }]
}, { timestamps: true});

module.exports = mongoose.model('Category', categorySchema);