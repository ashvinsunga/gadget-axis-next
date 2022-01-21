const expressJwt = require('express-jwt');

// returns user once confirmed
const verifyToken = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

module.exports = verifyToken;
