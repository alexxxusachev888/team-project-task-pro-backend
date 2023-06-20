const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

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
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    token: String,
    theme: {
      type: String,
      enum: ['Light', 'Violet', 'Dark'],
      default: 'Light',
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);
userSchema.post('save', handleMongooseError);

const errorMessages = (label) => ({
  'string.base': `"${label}" should be a type of 'text'`,
  'string.empty': `"${label}" cannot be an empty field`,
  'any.required': `"${label}" is a required field`,
});

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
  theme: Joi.any()
    .valid('Light', 'Violet', 'Dark')
    .messages(errorMessages('theme')),
}).options({ abortEarly: false });

/* const userEmailSchema = Joi.object({
  email: Joi.string().required().messages(errorMessages('email')),
}).options({ abortEarly: false }); */

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  /*   userEmailSchema */
};

module.exports = {
  User,
  schemas,
};
