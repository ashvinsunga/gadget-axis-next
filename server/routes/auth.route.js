const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');

//middleware
const verifyToken = require('../middlewares/auth.middleware');
//controllers
const {
  loginUser,
  currentUser,
  getUsers,
  addUser,
  getGadgets,
  addGadget,
  getCustomers,
  addCustomer,
  uploadImage,
} = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.get('/getusers', getUsers);
router.post('/adduser', addUser);
router.get('/getgadgets', getGadgets);
router.post(
  '/uploadimage',
  verifyToken,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.post('/addgadget', addGadget);
router.get('/getcustomers', getCustomers);
router.post('/addcustomer', addCustomer);
router.get('/currentuser', verifyToken, currentUser);
module.exports = router;
