const User = require('../models/user.model');
const Gadget = require('../models/gadget.model');
const Customer = require('../models/customer.model');
const Rent = require('../models/rent.model');
const { hashPassword, comparePassword } = require('../helpers/auth.helper');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

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
    if (!match) {
      // console.log(password, user.password);
      return res.json({ error: 'Invalid password' });
    }

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
  const regexUsername = /^[a-z\d]{5,12}$/i;
  const regexPhone = /^09[\d]{9}$/;
  const regexPassword = /^[\d\w@-]{8,20}$/i;

  if (!regexUsername.test(username)) {
    return res.json({ error: 'Username is invalid' });
  }

  if (!regexPhone.test(phone)) {
    return res.json({ error: 'Phone no. is invalid' });
  }

  if (!regexPassword.test(password)) {
    return res.json({ error: 'Password is invalid' });
  }

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
  const regexPhone = /^09[\d]{9}$/;
  const regexPassword = /^[\d\w@-]{8,20}$/i;

  if (!regexPhone.test(phone)) {
    return res.json({ error: 'Phone no. is invalid' });
  }

  if (!description) {
    return res.json({ error: 'Description is required' });
  }

  if (oldpassword) {
    if (!regexPassword.test(newpassword)) {
      return res.json({ error: 'Password is invalid' });
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

    // hash password
    hashedPassword = await hashPassword(newpassword);
  }

  if (!permission) {
    return res.json({
      error: 'Permission is required',
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
    if (oldpassword) {
      const user = await User.findByIdAndUpdate(
        selecteditem,
        {
          description,
          phone,
          password: hashedPassword,
          permission,
        },
        { new: true }
      );
      res.json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        selecteditem,
        {
          description,
          phone,
          permission,
        },
        { new: true }
      );
      res.json(user);
    }
    // console.log('Passed all validations!', newpassword, confirmpassword);
    // await
    //   // console.log('REGISTERED USER =>', user);
    //   return res.json({ ok: true });
  } catch (err) {
    return res.json({ error: 'Error. Try again' });
  }
};

const deleteUser = async (req, res) => {
  const { deletionpassword, currentuser, selecteditem } = req.body;
  const user = await User.findById(currentuser, '_id password');

  if (currentuser == selecteditem) {
    return res.json({ error: 'Deleting a logged in user is not allowed!' });
  }

  const match = await comparePassword(deletionpassword, user.password);
  if (!match) {
    return res.json({ error: 'Invalid password!' });
  }

  try {
    const user = await User.findByIdAndDelete(selecteditem);
    return res.json({ data: 'ok' });
  } catch (err) {
    console.log(err);
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
  let imageData = {};
  if (!image.url || !image.public_id) {
    imageData = {
      url: 'https://res.cloudinary.com/dnx7ywtdu/image/upload/v1644474291/logo-black_btksxg.png',
      public_id: 'garbles',
    };
  } else {
    imageData = image;
  }

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
    image: imageData,
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

const editGadget = async (req, res) => {
  // console.log('EDIT ENDPOINT =>',req.body);

  const { selecteditem, brand, product, model, serial, image, color, rate } =
    req.body;

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

  try {
    const gadget = await Gadget.findByIdAndUpdate(
      selecteditem,
      {
        brand,
        product,
        model,
        serial,
        image,
        color,
        rate,
      },
      { new: true }
    );
    // return res.json(gadget);

    // console.log('Passed all validations!', newpassword, confirmpassword);
    // await
    //   // console.log('REGISTERED USER =>', user);
    return res.json({ ok: true });
  } catch (err) {
    return res.json({ error: 'Error. Try again' });
  }
};

const deleteGadget = async (req, res) => {
  const { deletionpassword, currentuser, selecteditem } = req.body;
  const user = await User.findById(currentuser, '_id password');

  const match = await comparePassword(deletionpassword, user.password);
  if (!match) {
    return res.json({ error: 'Invalid password!' });
  }

  try {
    const gadget = await Gadget.findByIdAndDelete(selecteditem);

    // remove image from cloudinary
    if (gadget.image && gadget.image.public_id) {
      // console.log(gadget.image.public_id);
      const image = await cloudinary.uploader.destroy(gadget.image.public_id);
    }
    return res.json({ ok: 'true' });
  } catch (err) {
    console.log(err);
  }
};

const queryGadget = async (req, res) => {
  try {
    const data = await Gadget.findById(req.body.selecteditem);
    res.json(data);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
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

const getCustomersName = async (req, res) => {
  try {
    const data = await Customer.find({}, 'name').sort({ createdAt: -1 });
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
  const regexPhone = /^09[\d]{9}$/;
  const regexEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

  if (!regexPhone.test(phone)) {
    return res.json({ error: 'Phone no. is invalid' });
  }

  if (!regexEmail.test(email)) {
    return res.json({ error: 'Email is invalid' });
  }

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
    const data = await Customer.findById(customer._id);
    return res.json(data);
    // return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error. Try again' });
  }
};

const editCustomer = async (req, res) => {
  // console.log('EDIT ENDPOINT =>',req.body);

  const { selecteditem, name, idpresented, idno, phone, email } = req.body;

  // validation
  if (!name) {
    return res.json({ error: 'Name is required' });
  }
  if (!idpresented) {
    return res.json({ error: 'ID is required' });
  }
  if (!idno) {
    return res.json({ error: 'ID No. is required' });
  }
  if (!phone) {
    return res.json({ error: 'Phone is required' });
  }

  try {
    const customer = await Customer.findByIdAndUpdate(
      selecteditem,
      {
        name,
        id_presented: idpresented,
        id_no: idno,
        phone,
        email,
      },
      { new: true }
    );
    // return res.json(gadget);

    // console.log('Passed all validations!', newpassword, confirmpassword);
    // await
    //   // console.log('REGISTERED USER =>', user);
    return res.json({ ok: true });
  } catch (err) {
    return res.json({ error: 'Error. Try again' });
  }
};

const deleteCustomer = async (req, res) => {
  const { deletionpassword, currentuser, selecteditem } = req.body;
  const user = await User.findById(currentuser, '_id password');

  const match = await comparePassword(deletionpassword, user.password);
  if (!match) {
    return res.json({ error: 'Invalid password!' });
  }

  try {
    const customer = await Customer.findByIdAndDelete(selecteditem);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

const queryCustomer = async (req, res) => {
  try {
    const data = await Customer.findById(req.body.selecteditem);
    res.json(data);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
};

const listNintendo = async (req, res) => {
  //
  try {
    const nintendo = await Gadget.find({
      brand: 'Nintendo',
    });
    // console.log(nintendo);
    res.json(nintendo);
  } catch (err) {
    console.log(err);
  }
};

const listSony = async (req, res) => {
  //
  try {
    const sony = await Gadget.find({
      brand: 'Sony',
    });
    // console.log(nintendo);
    res.json(sony);
  } catch (err) {
    console.log(err);
  }
};

const listMicrosoft = async (req, res) => {
  //
  try {
    const microsoft = await Gadget.find({
      brand: 'Microsoft',
    });
    // console.log(nintendo);
    res.json(microsoft);
  } catch (err) {
    console.log(err);
  }
};

const confirmRent = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  const { customerid, gadgetid, rentedbyid, startDate, endDate, totalrate } =
    req.body;
  // validation;
  if (!customerid) {
    return res.json({ error: 'Customer is required' });
  }
  if (!startDate || !endDate) {
    return res.json({ error: 'Invalid date range' });
  }

  const rent = new Rent({
    customer: customerid,
    gadget: gadgetid,
    rented_by: rentedbyid,
    rent_start: startDate,
    rent_end: endDate,
    total_rate: totalrate,
    status: 'Ongoing',
  });

  try {
    await rent.save(); // await
    // console.log('REGISTERED RENT =>', gadget);
    const gadget = await Gadget.findByIdAndUpdate(
      gadgetid,
      {
        status: 'Rented',
      },
      { new: true }
    );

    const customer = await Customer.findByIdAndUpdate(
      customerid,
      {
        $push: { current_rent: gadgetid },
      },
      { new: true }
    );

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error. Try again' });
  }
};

const listRents = async (req, res) => {
  //

  try {
    const rents = await Rent.find({ status: 'Ongoing' })
      .populate('customer', 'name phone')
      .populate('gadget', 'product model serial color rate')
      .populate('rented_by', 'username');
    res.json(rents);
  } catch (err) {
    console.log(err);
  }
};

const confirmEndRent = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  // validation
  const {
    deletionpassword,
    currentuser,
    customerid,
    selectedrent,
    selectedgadget,
  } = req.body;
  const user = await User.findById(currentuser, '_id password');

  const match = await comparePassword(deletionpassword, user.password);
  if (!match) {
    return res.json({ error: 'Invalid password!' });
  }

  try {
    const rent = await Rent.findByIdAndUpdate(
      selectedrent,
      {
        status: 'Ended',
        return_date: new Date().toISOString(),
      },
      { new: true }
    );
    const gadget = await Gadget.findByIdAndUpdate(
      selectedgadget,
      {
        status: 'Available',
      },
      { new: true }
    );

    const customer = await Customer.findByIdAndUpdate(
      customerid,
      {
        $pull: { current_rent: selectedgadget },
      },
      { new: true }
    );

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error. Try again' });
  }
};

const listRentHistory = async (req, res) => {
  try {
    const rents = await Rent.find({ status: 'Ended' })
      .sort({ createdAt: -1 })
      .populate('customer', 'name phone')
      .populate('gadget', 'product model serial color rate')
      .populate('rented_by', 'username');
    res.json(rents);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
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
  uploadImage,
  getCustomers,
  getCustomersName,
  addCustomer,
  editCustomer,
  deleteCustomer,
  queryCustomer,
  loginUser,
  currentUser,
  listNintendo,
  listSony,
  listMicrosoft,
  confirmRent,
  listRents,
  listRentHistory,
  confirmEndRent,
};
