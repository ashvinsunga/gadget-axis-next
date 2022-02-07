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
  editUser,
  deleteUser,
  queryUser,
  getGadgets,
  addGadget,
  editGadget,
  deleteGadget,
  queryGadget,
  getCustomers,
  getCustomersName,
  addCustomer,
  editCustomer,
  deleteCustomer,
  queryCustomer,
  uploadImage,
  listNintendo,
  listSony,
  listMicrosoft,
  confirmRent,
  listRents,
  listRentHistory,
  confirmEndRent,
} = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.get('/getusers', getUsers);
router.post('/adduser', addUser);
router.put('/edituser', verifyToken, editUser);
router.delete('/deleteuser', deleteUser);
router.post('/queryuser', queryUser);
router.get('/getgadgets', getGadgets);
router.post(
  '/uploadimage',
  verifyToken,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.post('/addgadget', addGadget);
router.put('/editgadget', verifyToken, editGadget);
router.delete('/deletegadget', deleteGadget);
router.post('/querygadget', queryGadget);
router.get('/getcustomers', getCustomers);
router.get('/getcustomersname', getCustomersName);
router.post('/addcustomer', addCustomer);
router.put('/editcustomer', verifyToken, editCustomer);
router.delete('/deletecustomer', deleteCustomer);
router.post('/querycustomer', queryCustomer);
router.get('/currentuser', verifyToken, currentUser);

//Rent
router.get('/listnintendo', verifyToken, listNintendo);
router.get('/listsony', verifyToken, listSony);
router.get('/listmicrosoft', verifyToken, listMicrosoft);
router.post('/confirmrent', confirmRent);
router.get('/listrents', verifyToken, listRents);
router.get('/listrenthistory', verifyToken, listRentHistory);
router.put('/confirmendrent', verifyToken, confirmEndRent);
module.exports = router;
