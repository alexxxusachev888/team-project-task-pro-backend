const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
/* const URL = require('url').URL; */
const queryString = require('querystring');
const cloudinary = require('cloudinary').v2;
const { ctrlWrapper, handleHttpError } = require('../helpers');
const { User, Board, Session } = require('../models'); // add session from models

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
    authMethod: 'local',
  });

  const user = await User.findOne({ email });

  const newSession = await Session.create({ userId: user._id });

  const token = jwt.sign({ id: user._id, sid: newSession._id }, 
    process.env.JWT_SECRET, {
    expiresIn: '25m',
  }); // adding session id to token

  const refreshToken = jwt.sign({ id: user._id, sid: newSession._id }, 
    process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  }); // creating refresh token

  await User.findByIdAndUpdate(user._id, { token });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/users/refreshToken',
  }); // sending refresh token to client

  res.status(201).json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    token,
    theme: user.theme,
    authMethod: 'local',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, 'Email or password is wrong');

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    throw handleHttpError(401, 'Email or password is wrong');

  const newSession = await Session.create({ userId: user._id }); // creatind session for user

  const token = jwt.sign({ id: user._id, sid: newSession._id }, 
    process.env.JWT_SECRET, {
    expiresIn: '24h',
  }); // adding session id to token

  const refreshToken = jwt.sign({ id: user._id, sid: newSession._id }, 
    process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  }); // creating refresh token
  
  await User.findByIdAndUpdate(user._id, { token });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/users/refreshToken',
  }); // sending refresh token to client

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

  await Session.findByIdAndDelete({userId: _id}); // deleting session for user

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
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw handleHttpError(403, 'Access denied');
  }

  const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const session = await Session.findOne({ userId: id }); // checking if session exists

  if (!session) {
    throw handleHttpError(403, 'Access denied');
  }

  const token = jwt.sign({ id: id, sid: session._id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  res.json({ token });
};

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.PROJECT_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );

};

const googleAuthRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams['?code'];

  if (!code) {
    throw handleHttpError(400, 'Bad request');
  }

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.PROJECT_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const { data } = await axios({
    url: `https://www.googleapis.com/oauth2/v2/userinfo`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  let user;
  let token;
  const userExists = await User.findOne({ email: data.email });

  if (userExists) {
    const newSession = await Session.create({ userId: userExists._id });
    const jwtPayload = { id: userExists._id, sid: newSession._id};
    token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '25m' });

    user = await User.findByIdAndUpdate(userExists._id, { token }, { new: true });
  } else {
    const newUser = {
      name: data.name,
      email: data.email,
      authMethod: 'google',
      avatarURL: '',
    };

    user = await User.create(newUser);
    const newSession = await Session.create({ userId: user._id });
    const jwtPayload = { id: user._id, sid: newSession._id}; 
    token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '25m' });
    user = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  }

/*   res.status(201).json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    token,
    theme: user.theme,
  }); */

  return res.redirect(
    `${process.env.FRONTEND_URL}/welcome?name=${user.name}&email=${user.email}&avatarURL=${user.avatarURL}&token=${token}`,
  );

}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  refreshToken: ctrlWrapper(refreshToken),
  googleAuth: ctrlWrapper(googleAuth),
  googleAuthRedirect: ctrlWrapper(googleAuthRedirect),
};
