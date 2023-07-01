const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, errorMessages } = require('../helpers');

const sendEmailSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please set an email for the user.'],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const sendEmail = model('sendEmail', sendEmailSchema);
sendEmailSchema.post('save', handleMongooseError);

const sendEmailSchemaJoi = Joi.object({
  email: Joi.string().required().messages(errorMessages('email')),
  comment: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = {
  sendEmail,
  sendEmailSchemaJoi,
};
