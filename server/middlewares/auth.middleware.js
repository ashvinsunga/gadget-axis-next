const expressJwt = require('express-jwt');

// if confirmed, adds user._id to the request body
const verifyToken = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = verifyToken;
