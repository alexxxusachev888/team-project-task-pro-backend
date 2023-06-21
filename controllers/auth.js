const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const Jimp = require('jimp');
const gravatar = require('gravatar');
const cloudinary = require('cloudinary').v2;
const { ctrlWrapper, handleHttpError } = require('../helpers');
const { User } = require('../models/user');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const register = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw handleHttpError(409, 'Email is already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '68' }, true);

  await User.create({ ...req.body, password: hashedPassword, avatarURL });

  const user = await User.findOne({ email });
  const jwtPayload = { id: user._id };
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    name: user.name,
    email: user.email,
    avatarURL,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, 'Email or password is wrong');

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    throw handleHttpError(401, 'Email or password is wrong');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatarURL } = req.user;

  res.json({ id: _id, name, email, avatarURL });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).end();
};

const update = async (req, res) => {
  const { _id } = req.user;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(_id, updates, { new: true });
  res.json(user);
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const newAvatarName = `${_id}_${originalname}`;
  const image = await Jimp.read(tempDir);
  await image.resize(233, 233).writeAsync(tempDir);

  const result = await cloudinary.uploader.upload(tempDir, {
    public_id: `avatars/${newAvatarName}`,
    overwrite: true,
  });

  await fs.unlink(tempDir);
  const avatarURL = result.url;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
