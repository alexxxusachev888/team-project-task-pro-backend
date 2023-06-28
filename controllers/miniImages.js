const { MiniImg } = require("../models/miniImages");
const { ctrlWrapper, handleHttpError } = require("../helpers");

const getAllminiImg = async (req, res) => {
  const result = await MiniImg.find();
  res.status(200).json(result);
};

const getMiniImageById = async (req, res) => {
  const { id } = req.params;
  const result = await MiniImg.findOne({ _id: id });
  if (!result) {
    throw handleHttpError(404, "Image not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllminiImg: ctrlWrapper(getAllminiImg),
  getMiniImageById: ctrlWrapper(getMiniImageById),
};
