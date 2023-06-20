const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const cloudinary = require('cloudinary').v2;

const { ctrlWrapper, handleHttpError, sendEmail } = require("../helpers");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET 
});

const register = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw handleHttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "68" }, true);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.json({
    user: {
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw handleHttpError(401, "Email or password is wrong");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw handleHttpError(401, "Email or password is wrong");
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatarURL } = req.user;

  res.json({ id: _id, name, email, avatarURL });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

const update = async (req, res) => {
  const { _id } = req.user;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(_id, updates, { new: true });
  res.json(user);
};

const updateTheme = async (req, res, next) => {
    const { theme } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return next(new Error("User not found"));
    }

    await User.findByIdAndUpdate(_id, { theme });
    res.json({ theme });
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const newAvatarName = `${_id}_${originalname}`;
  const image = await Jimp.read(tempDir);
  await image.resize(233, 233).writeAsync(tempDir);

  const result = await cloudinary.uploader.upload(tempDir, { 
    public_id: `avatars/${newAvatarName}`, 
    overwrite: true
  });

  await fs.unlink(tempDir);
  const avatarURL = result.url; 
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw handleHttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (!user) {
    throw handleHttpError(404, "User not found");
  }

  if (user.verify) {
    throw handleHttpError(400, "Verification has already been passed");
  }

  const emailData = {
    to: email,
    subject: "Please verify your email",
    html: `<a href="${process.env.PROJECT_URL}/users/verify/${user.verificationCode}">Please verify your email</a>`,
  };

  await sendEmail(emailData);

  res.json({
    message: "Verification email sent",
  });
};

const refreshToken = async (req, res) => {
  const { _id } = req.user;

  const newToken = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: "15h",
  });
  await User.findByIdAndUpdate(_id, { token: newToken });

  res.json({ token: newToken });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
  avatarUpdate: ctrlWrapper(avatarUpdate),
  resendVerificationEmail: ctrlWrapper(resendVerificationEmail),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateTheme: ctrlWrapper(updateTheme),
  refreshToken: ctrlWrapper(refreshToken),
};
