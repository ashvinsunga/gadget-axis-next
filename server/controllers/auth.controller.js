const User = require('../models/user.model');
const { hashPassword } = require('../helpers/auth.helper');

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
  if (!username) return res.status(400).send('Username is required');
  if (!description) return res.status(400).send('Description is required');
  if (!password || password.length < 6)
    return res.status(400).send('Password must be longer than 6 characters');
  if (password != confirmpassword)
    return res.status(400).send('Passwords do not match');

  if (!permission) return res.status(400).send('Permission required');

  const exist = await User.findOne({ username });
  if (exist) return res.status(400).send('User already exist');

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
    console.log('REGISTER FAILED =>', err);
    return res.status(400).send('Error. Try again');
  }
};

module.exports = { addUser };
