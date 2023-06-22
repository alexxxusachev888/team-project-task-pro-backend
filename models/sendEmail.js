const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError, errorMessages } = require("../helpers");

const sendEmailSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      unique: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const sendEmail = model("sendEmail", sendEmailSchema);
sendEmailSchema.post("save", handleMongooseError);

const sendEmailSchemaJoi = Joi.object({
  comment: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = {
  sendEmail,
  sendEmailSchemaJoi,
};
