const { ctrlWrapper, handleHttpError } = require('../helpers');

const { BoardTest, ColumnTest, TaskTest } = require('../models/boardTest');

const getAllBoardTest = async (req, res) => {
  let boards = await BoardTest.find();
  boards = boards || [];
  res.status(200).json(boards);
};

const getBoardByIdTest1 = async (req, res) => {
  const { id } = req.params;
  const board = await BoardTest.findOne({ id });
  if (!board) throw handleHttpError(404, `Board with id ${id} not found`);

  const boards = id;
  const columns = (await ColumnTest.find({ boards })) || [];
  const tasks = (await TaskTest.find({ boards })) || [];

  res.status(200).json({ ...board._doc, columns, tasks });
};

module.exports = {
  getAllBoardTest: ctrlWrapper(getAllBoardTest),
  getBoardByIdTest1: ctrlWrapper(getBoardByIdTest1),
};
