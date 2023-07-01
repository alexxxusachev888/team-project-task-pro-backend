const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { ctrlWrapper, handleHttpError } = require('../helpers');
const { User, Board, Session } = require('../models');

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

  await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL: '',
  });

  const user = await User.findOne({ email });
  const jwtPayload = { id: user._id };
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    token,
    theme: user.theme,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, 'Email or password is wrong');

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    throw handleHttpError(401, 'Email or password is wrong');

    const newSession = await Session.create({ user: user._id});

  const token = jwt.sign({ id: user._id, sid: newSession._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  const refreshToken = jwt.sign({ id: user._id, sid: newSession._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '10d',
  });

  await User.findByIdAndUpdate(user._id, { token });

  const boards = await Board.find({ owner: user._id });

  res.json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    token,
    theme: user.theme,
    currentBoard: user.currentBoard,
    boards,
  });
};

const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatarURL, theme, currentBoard } = req.user;
  const boards = await Board.find({ owner: _id });

  res.json({
    id: _id,
    name,
    email,
    avatarURL,
    theme,
    currentBoard,
    boards,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  await Session.findOneAndDelete({ user: _id, refreshToken: '' });
  res.status(204).json({});
};

const update = async (req, res) => {
  const { _id } = req.user;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(_id, updates, { new: true });
  res.json(user);
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path, originalname } = req.file;

  const newAvatarName = `${_id}_${originalname}`;

  const result = await cloudinary.uploader.upload(path, {
    public_id: `avatars/${newAvatarName}`,
    overwrite: true,
    transformation: { width: 68, height: 68, crop: 'fill' },
  });

  await User.findByIdAndUpdate(_id, { avatarURL: result.secure_url });

  res.status(200).json({ avatarURL: result.secure_url });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.user;

  if(!refreshToken) throw handleHttpError(401, 'Not authorized');

  const isRefreshTokenValid = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if(!isRefreshTokenValid) throw handleHttpError(401, 'Not authorized');

  const { id, sid } = isRefreshTokenValid;
  const session = await Session.findById(sid);
  if (!session) throw handleHttpError(401, 'Session is not valid');

  const token = jwt.sign({ id, sid }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  const newRefreshToken = jwt.sign({ id, sid }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '10d',
  });

  await Session.findByIdAndUpdate(sid, { refreshToken: newRefreshToken });
  res.json({ token, refreshToken: newRefreshToken });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  refreshToken: ctrlWrapper(refreshToken),
};
