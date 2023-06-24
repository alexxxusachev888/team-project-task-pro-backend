const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema({
  title: {
    type: String,
    required: [true, "Board`s title is required"],
    unique: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
});

const columnSchemaJoi = Joi.object({
  title: Joi.string().min(2).max(100).required(),
}).options({ abortEarly: false });

const columnUpdateSchemaJoi = Joi.object({
  title: Joi.string().min(2).max(100).required(),
}).options({ abortEarly: false });

const Column = model("column", columnSchema);
columnSchema.post("save", handleMongooseError);

module.exports = {
  Column,
  columnSchemaJoi,
  columnUpdateSchemaJoi
};
