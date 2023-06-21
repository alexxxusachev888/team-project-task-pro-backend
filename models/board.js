const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, errorMessages } = require('../helpers');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Board`s title is required'],
      unique: true,
    },
    iconId: {
      type: String,
      required: [true, 'Board`s icons ID is required'],
    },
    backgroundId: {
      type: String,
      required: [true, 'Board`s background ID is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Board = model('board', boardSchema);
boardSchema.post('save', handleMongooseError);

const boardSchemaJoi = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages(errorMessages('title')),
  icon: Joi.string().required().messages(errorMessages('icon')),
  background: Joi.string().required().messages(errorMessages('background')),
}).options({ abortEarly: false });

module.exports = { Board, boardSchemaJoi, boardSchema };
