const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const miniImgSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      image: ["regular", "retina"],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const MiniImg = model("MiniImg", miniImgSchema);
miniImgSchema.post("save", handleMongooseError);

module.exports = { miniImgSchema, MiniImg };
