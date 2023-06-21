const { ctrlWrapper } = require("../helpers");
const { User } = require('../models/user');

const createBoard = async (req, res) => {};

const updateBoard = async (req, res) => {};

const deleteBoard = async (req, res) => {};

const updateBoardIconBackground = async (req, res) => {}

module.exports = {
createBoard: ctrlWrapper(createBoard),
updateBoard: ctrlWrapper(updateBoard),
deleteBoard: ctrlWrapper(deleteBoard),
updateBoardIconBackground: ctrlWrapper(updateBoardIconBackground),
};
  