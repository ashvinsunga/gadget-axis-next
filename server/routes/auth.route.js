const express = require('express');
const router = express.Router();

//middleware
const verifyToken = require('../middlewares/auth.middleware');
//controllers
const {
  loginUser,
  currentUser,
  getUsers,
  addUser,
} = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.get('/getusers', getUsers);
router.post('/adduser', addUser);
router.get('/currentuser', verifyToken, currentUser);
module.exports = router;
