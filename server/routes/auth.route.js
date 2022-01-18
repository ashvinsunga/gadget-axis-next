const express = require('express');
const router = express.Router();

//controllers
const { addUser, userList } = require('../controllers/auth.controller');

router.post('/adduser', addUser);

module.exports = router;
