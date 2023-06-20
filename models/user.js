const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');
const { errorMessages } = require('../helpers');
const { boardSchema } = require('./board');

const userSchema = new Schema({
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
  token: {
    type: String,
    default: '',
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  boards: [boardSchema]
}, {versionKey: false, timestamps: true});

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
  theme: Joi.string().valid('light', 'dark', 'violet').messages(errorMessages('theme')),
  avatarURL: Joi.string().uri().optional().messages(errorMessages('avatarURL')),
}).options({ abortEarly: false });

const themeUpdateSchema = Joi.object({
  theme: Joi.string().valid('light', 'dark', 'violet').required().messages(errorMessages('theme')),
}).options({ abortEarly: false });

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  themeUpdateSchema
}

module.exports = {
  User,
  schemas,
  errorMessages,
};
