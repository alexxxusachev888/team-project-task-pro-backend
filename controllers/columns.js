const { ctrlWrapper } = require("../helpers");

const createColumn = async (req, res) => {};

const updateColumn = async (req, res) => {};

const deleteColumn = async (req, res) => {};

module.exports = {
createColumn: ctrlWrapper(createColumn),
updateColumn: ctrlWrapper(updateColumn),
deleteColumn: ctrlWrapper(deleteColumn),
};