const express = require('express');
const router = express.Router();

//middleware
const verifyToken = require('../middlewares/auth.middleware');
//controllers
const {
  addUser,
  loginUser,
  currentUser,
} = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.post('/adduser', addUser);
router.get('/currentuser', verifyToken, currentUser);
module.exports = router;
