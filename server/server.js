const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

//db
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, family: 4 })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Database connection error =>', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));
// autoload routes for admin route requests
readdirSync('./routes').map((route) =>
  app.use('/api', require(`./routes/${route}`))
);

// readdirSync('./routes').map((route) =>
//   app.use('/admin/gadgets', require(`./routes/${route}`))
// );

// readdirSync('./routes').map((route) =>
//   app.use('/admin/customers', require(`./routes/${route}`))
// );
//manual importing of route
// app.use('/', require(`./routes/auth.route`));
// app.use('/admin', require(`./routes/auth.route`));
// app.use('/admin/users', require(`./routes/auth.route`));
// app.use('/admin/customers', require(`./routes/auth.route`));
// app.use('/admin/gadgets', require(`./routes/auth.route`));
// app.use('/rentnow', require(`./routes/auth.route`));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
