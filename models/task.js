const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError, errorMessages } = require("../helpers");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task`s title is required"],
    },
    description: {
      type: String,
      required: [true, "Task`s description is required"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Without"],
      required: [true, "Task`s priority is required"],
      //   default: "Without",
    },
    deadline: {
      type: Date,
      required: [true, "Task`s deadline is required"],
      min: Date.now(),
      //   default: Date.now(),
    },
    status: {
      type: String,
      enum: ['in progress', 'done'],
      required: [true, "Task`s status is required"],
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model("task", taskSchema);
taskSchema.post("save", handleMongooseError);

const taskSchemaJoi = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid("Low", "Medium", "High", "Without").required(),
  deadline: Joi.date().min("now").required(),
  status: Joi.string().valid('in progress', 'done').required(),
  column: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = { Task, taskSchemaJoi };
