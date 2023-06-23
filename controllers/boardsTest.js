const { ctrlWrapper, handleHttpError } = require('../helpers');
const { populate } = require('dotenv');

const { BoardTest, ColumnTest, TaskTest } = require('../models/boardTest');

const getAllBoardTest = async (req, res) => {
  //   const { _id: owner } = req.user;
  let boards = await BoardTest.find();
  boards = boards || [];
  res.status(200).json(boards);
};

const getBoardByIdTest1 = async (req, res) => {
  //   const { _id: owner } = req.user;
  const { id: boards } = req.params;

  let columns = await ColumnTest.find({ boards });
  let tasks = await TaskTest.find({ boards });

  columns = columns || [];
  tasks = tasks || [];

  res.status(200).json({ columns, tasks });
};

const getBoardByIdTest2 = async (req, res) => {
  // const { _id: owner } = req.user;
  // const board = await Board.findOne({ owner }).populate({
  const { id } = req.params;
  const board = await BoardTest.findOne({ id }).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
    },
  });
  res.status(200).json(board);
};

module.exports = {
  getAllBoardTest: ctrlWrapper(getAllBoardTest),
  getBoardByIdTest1: ctrlWrapper(getBoardByIdTest1),
  getBoardByIdTest2: ctrlWrapper(getBoardByIdTest2),
};
