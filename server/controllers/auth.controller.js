const User = require('../models/user.model');
const Gadget = require('../models/gadget.model');
const Customer = require('../models/customer.model');
const { hashPassword, comparePassword } = require('../helpers/auth.helper');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { post } = require('../routes/auth.route');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exist on db
    const user = await User.findOne({ username });
    if (!user) return res.json({ error: 'Invalid username' });
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.json({ error: 'Invalid password' });
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.password = undefined;
    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again!');
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await User.find({}).sort({ createdAt: -1 });
    // .sort({ createdAt: -1})
    // .limit(10);
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const addUser = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  const {
    username,
    description,
    phone,
    password,
    confirmpassword,
    permission,
  } = req.body;
  // validation
  if (!username) {
    return res.json({ error: 'Username is required' });
  }
  if (!description) {
    return res.json({ error: 'Description is required' });
  }
  if (!password || password.length < 6) {
    return res.json({ error: 'Password must be longer than 6 characters' });
  }
  if (password != confirmpassword) {
    return res.json({ error: 'Passwords do not match' });
  }

  if (!permission) {
    return res.json({ error: 'Permission is required' });
  }

  const exist = await User.findOne({ username });
  if (exist) {
    return res.json({ error: 'User already exist' });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    username,
    description,
    phone,
    password: hashedPassword,
    permission,
  });
  try {
    await user.save(); // await
    // console.log('REGISTERED USER =>', user);
    return res.json({ ok: true });
  } catch (err) {
    return res.json({ error: 'Error. Try again' });
  }
};

const editUser = async (req, res) => {
  // console.log('EDIT ENDPOINT =>',req.body);

  const {
    selecteditem,
    description,
    phone,
    dbpassword,
    oldpassword,
    permission,
  } = req.body;

  let { newpassword, confirmpassword } = req.body;
  // validation

  if (!description) {
    return res.json({ error: 'Description is required' });
  }

  if (oldpassword) {
    if (!newpassword || newpassword.length < 6) {
      return res.json({ error: 'Password must be longer than 6 characters' });
    }
    if (newpassword != confirmpassword) {
      return res.json({ error: 'Passwords do not match' });
    }
    const match = await comparePassword(oldpassword, dbpassword);
    if (!match) {
      return res.json({ error: 'Old password is invalid' });
    }

    const matchNew = await comparePassword(newpassword, dbpassword);
    if (matchNew) {
      return res.json({
        error: 'Your new password cannot be same as old password',
      });
    }

    // // hash password
    // hashedPassword = await hashPassword(newpassword);
  }

  if (!permission) {
    return res.json({
      error: 'Permission is required',
      newpassword,
      confirmpassword,
    });
  }

  // const user = new User({
  //   username,
  //   description,
  //   phone,
  //   password: hashedPassword;
  //   permission,
  // });
  try {
    console.log('Passed all validations!', newpassword, confirmpassword);
    //   const user = await User.findByIdAndUpdate(selecteditem,(); // await
    //   // console.log('REGISTERED USER =>', user);
    //   return res.json({ ok: true });
  } catch (err) {
    return res.json({ error: 'Error. Try again' });
  }
};

const queryUser = async (req, res) => {
  try {
    const data = await User.findById(req.body.selecteditem);
    res.json(data);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
};

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log('uploaded image url =>', result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
};

const getGadgets = async (req, res) => {
  try {
    const data = await Gadget.find({}).sort({ createdAt: -1 });
    // .sort({ createdAt: -1})
    // .limit(10);
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const addGadget = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  const { brand, product, model, serial, color, image, rate } = req.body;
  // validation
  if (!brand) {
    return res.json({ error: 'Brand is required' });
  }
  if (!product) {
    return res.json({ error: 'Product is required' });
  }
  if (!model) {
    return res.json({ error: 'Model is required' });
  }
  if (!serial) {
    return res.json({ error: 'Serial is required' });
  }

  if (!color) {
    return res.json({ error: 'Color is required' });
  }
  if (rate < 0) {
    return res.json({ error: 'Negative number is not allowed!' });
  }

  const gadget = new Gadget({
    brand,
    product,
    model,
    serial,
    color,
    image,
    rate,
    status: 'Available',
  });
  try {
    await gadget.save(); // await
    // console.log('REGISTERED GADGET =>', gadget);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error. Try again' });
  }
};

const getCustomers = async (req, res) => {
  try {
    const data = await Customer.find({}).sort({ createdAt: -1 });
    // .sort({ createdAt: -1})
    // .limit(10);
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const addCustomer = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  const { name, idpresented, idno, phone, email } = req.body;
  // validation
  if (!name) {
    return res.json({ error: 'Name is required' });
  }
  if (!idpresented) {
    return res.json({ error: 'ID presented is required' });
  }
  if (!idno) {
    return res.json({ error: 'ID no is required' });
  }
  if (!phone) {
    return res.json({ error: 'Phone is required' });
  }

  const customer = new Customer({
    name,
    id_presented: idpresented,
    id_no: idno,
    phone,
    email,
  });
  try {
    await customer.save(); // await
    // console.log('REGISTERED GADGET =>', gadget);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error. Try again' });
  }
};

const listNintendo = async (req, res) => {
  //
  try {
    const nintendo = await Gadget.find({
      brand: 'Nintendo',
    });
    console.log(nintendo);
    res.json(nintendo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  addUser,
  editUser,
  queryUser,
  getGadgets,
  addGadget,
  uploadImage,
  getCustomers,
  addCustomer,
  loginUser,
  currentUser,
  listNintendo,
};
