const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../helpers/auth.helper');
const jwt = require('jsonwebtoken');

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
      expiresIn: 180,
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
    res.status(400);
  }
};

module.exports = { addUser, loginUser, currentUser };
