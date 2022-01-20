const express = require('express');
const router = express.Router();

//controllers
const { addUser, loginUser } = require('../controllers/auth.controller');

router.post('/loginuser', loginUser);
router.post('/adduser', addUser);

module.exports = router;
