const { Background } = require('../models/background')
const { ctrlWrapper, handleHttpError } = require('../helpers');

const getAllBackground = async (req, res) => {
    const result = await Background.find();
    res.status(200).json(result);
};

const getBackgroundById = async (req, res) => {
    const { name } = req.params;
    const result = await Background.findOne({name: name});
    if (!result) {
        throw handleHttpError(404, "Background image not found");
    }
    res.status(200).json(result);
};

module.exports = {
    getAllBackground: ctrlWrapper(getAllBackground),
    getBackgroundById: ctrlWrapper(getBackgroundById)
};