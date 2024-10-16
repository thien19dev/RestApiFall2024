var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get
router.get('/get-users' , (req, res) => {
  User.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Get user failed: '});
      })
})

//post , register
router.post('/register', (req, res) => {
  const { name, username, password, email, phoneNumber } = req.body;
  const user = new User({
    name,
    username,
    password,
    email,
    phoneNumber
  });
  user.save()
      .then((saveUser) => {
        res.status(200).json({message: 'User register succesfully', user: saveUser})
      })
      .catch((err) => {
        res.status(500).json({message: 'User register failed: ' + err});
      })
});

//login
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({username});

    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if(user.password !== password){
      return res.status(401).json({message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({message: 'Internal server error' });
  }
});

// Xóa người dùng
router.delete('/delete-user/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId)
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Delete user failed: ' + err });
      });
});


module.exports = router;
