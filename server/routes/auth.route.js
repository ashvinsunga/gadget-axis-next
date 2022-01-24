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
  addGadget,
  addCustomer,
} = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.get('/getusers', getUsers);
router.post('/adduser', addUser);
router.post('/addgadget', addGadget);
router.post('/addcustomer', addCustomer);
router.get('/currentuser', verifyToken, currentUser);
module.exports = router;
