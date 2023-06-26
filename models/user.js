const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, errorMessages } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please set a name for the user'],
    },
    email: {
      type: String,
      required: [true, 'Please set an email for the user.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please set a password for the user'],
    },
    theme: {
      type: String,
      default: 'light',
    },
    avatarURL: {
      type: String,
      default: '',
    },
    currentBoard: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);
userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages(errorMessages('name')),
  email: Joi.string().required().messages(errorMessages('email')),
  password: Joi.string().required().messages(errorMessages('password')),
}).options({ abortEarly: false });

const loginSchema = Joi.object({
  password: Joi.string().required().messages(errorMessages('password')),
  email: Joi.string().required().messages(errorMessages('email')),
}).options({ abortEarly: false });

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages(errorMessages('name')),
  email: Joi.string().email().messages(errorMessages('email')),
  password: Joi.string().min(8).max(50).messages(errorMessages('password')),
  theme: Joi.string()
    .valid('light', 'dark', 'violet')
    .messages(errorMessages('theme')),
  avatarURL: Joi.string().uri().optional().messages(errorMessages('avatarURL')),
}).options({ abortEarly: false });

const currentBoardSchema = Joi.object({
  currentBoard: Joi.string().messages(errorMessages('currentBoard')),
}).options({ abortEarly: false });

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  currentBoardSchema,
};

module.exports = {
  User,
  schemas,
};
