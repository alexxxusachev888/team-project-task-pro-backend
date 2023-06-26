const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const backgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      desktop: ['regular', 'retina'],
      tablet: ['regular', 'retina'],
      mobile: ['regular', 'retina'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Background = model("Background", backgroundSchema);
backgroundSchema.post('save', handleMongooseError);

module.exports = {backgroundSchema, Background};