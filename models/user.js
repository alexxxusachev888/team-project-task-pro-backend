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

const emailValidation = Joi.string()
  .trim()
  .lowercase()
  .pattern(new RegExp("^[^\\.].*[^\\.]@.+\\..{3,}$"))
  .min(3)
  .max(254)
  .email()
  .required()
  .messages(errorMessages('email'));

const nameValidation = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .pattern(new RegExp("^[\p{L}\s'-]+$", 'u'))
  .required()
  .messages(errorMessages('name'));

const passwordValidation = Joi.string()
  .min(8)
  .max(50)
  .required()
  .messages(errorMessages('password'));

const themeValidation = Joi.string()
  .valid('light', 'dark', 'violet')
  .messages(errorMessages('theme'));

const registerSchema = Joi.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
}).options({ abortEarly: false });

const loginSchema = Joi.object({
  password: passwordValidation,
  email: emailValidation,
}).options({ abortEarly: false });

const updateSchema = Joi.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  theme: themeValidation,
  avatarURL: Joi.string().uri().optional().messages(errorMessages('avatarURL')),
}).options({ abortEarly: false });

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

module.exports = {
  User,
  schemas,
};