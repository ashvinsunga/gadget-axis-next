const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-type'],
  },
});
//db
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Database connection error =>', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);
app.use(morgan('dev'));
// autoload routes for admin route requests
// readdirSync('./routes').map((route) =>
//   app.use('/admin/users', require(`./routes/${route}`))
// );

// readdirSync('./routes').map((route) =>
//   app.use('/admin/gadgets', require(`./routes/${route}`))
// );

// readdirSync('./routes').map((route) =>
//   app.use('/admin/customers', require(`./routes/${route}`))
// );
//manual importing of route
app.use('/', require(`./routes/auth.route`));
app.use('/admin', require(`./routes/auth.route`));
app.use('/admin/users', require(`./routes/auth.route`));
app.use('/admin/customers', require(`./routes/auth.route`));
app.use('/admin/gadgets', require(`./routes/auth.route`));
app.use('/rentnow', require(`./routes/auth.route`));

// socket io
// io.on('connect', (socket) => {
//   socket.on('new-customer', (newCustomer) => {
//     // console.log('new customer =>', newCustomer);
//     socket.broadcast.emit('new-customer', newCustomer);
//   });
// });
const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
