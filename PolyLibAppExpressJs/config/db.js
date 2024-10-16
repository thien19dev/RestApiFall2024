const mongoose = require('mongoose');

const local = "mongodb://localhost:27017/polylibDB";

const atlat = "mongodb+srv://thien19dev:Thienhdph47232@polylibappbythien.tej7y.mongodb.net/polylibDB";

const connectDB = () => {
    mongoose.connect(atlat)
    .then(()=> {
        console.log('Connect MongoDB Successfuly!');
    })
    .catch((err)=>{
        console.log('Failed: ' + err);
    })
}

module.exports = { connectDB };