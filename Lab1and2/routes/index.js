var express = require('express');
var router = express.Router();

const {connect, Schema} = require("mongoose");
const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://thien19dev:thien19dev@restapilab1and2.6lzln.mongodb.net/';

connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => {
      console.log('Kết nối thành công');

    })
    .catch((err) => {
      console.error( 'Kết nối thất bại: ',err);
    });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', function(req, res, next) {
  console.log(req.query);
  res.render('categories', { title: 'Categories' });
});

router.get('/news', function(req, res, next) {
  console.log(req.query);
  res.render('news', { title: 'News' });
});

router.get('/user', function(req, res, next) {
    console.log(req.query);
    res.render('user', { title: 'User List' });
})

router.get('/about', function(req, res, next) {
  console.log(req.query);
  res.render('about', { title: 'About' });
});

router.post('/submit', function(req, res, next) {
  const{name, email, phone} = req.body;
  res.send(`Họ tên: ${name}, Email: ${email}, Số điện thoại: ${phone}`);
});



// Định nghĩa schema cho collection 'users'
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu cho _id trong MongoDB
    name: String,
    email: String,
    password: String // Mật khẩu đã được mã hóa (hashed)
});

// Model cho collection 'users'
const User = mongoose.model('User', userSchema);

// Route để hiển thị danh sách người dùng
router.get('/users', async (req, res) => {
    try {
        // Lấy tất cả users từ collection 'users'
        const users = await User.find();
        res.render('users', { users }); // render giao diện 'users.ejs' và truyền dữ liệu
    } catch (err) {
        console.log(err);
        res.status(500).send('Có lỗi xảy ra khi lấy danh sách người dùng.');
    }
});

module.exports = router;
