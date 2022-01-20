const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

//db
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Database connection error =>', err));

// middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
// autoload routes for admin route requests
readdirSync('./routes').map((route) =>
  app.use('/admin/users', require(`./routes/${route}`))
);

//manual importing of route
app.use('/', require(`./routes/auth.route`));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
