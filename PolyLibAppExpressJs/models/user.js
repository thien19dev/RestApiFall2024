const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        default: 1,
    }, // 1: user , 0: admin
});

const User = mongoose.model('User', userSchema);
module.exports = User;