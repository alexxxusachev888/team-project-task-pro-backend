const { ctrlWrapper, handleHttpError } = require('../helpers');
const { Board } = require('../models/board');
const { Task } = require('../models/task');
const { Column } = require('../models/column');
const { populate } = require('dotenv');

const createBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { title } = req.body;
  const board = await Board.findOne({ owner, title });

  if (board) throw handleHttpError(400, 'This board title is allready in use');

  const newBoard = await Board.create({ ...req.body, owner });
  res.status(201).json(newBoard);
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const board = await Board.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!board) throw handleHttpError(404, 'Not found');

  res.status(200).json(board);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const board = await Board.findByIdAndDelete(id);

  if (!board) throw handleHttpError(404, 'Not found');
  res.json({ message: 'Board deleted' });
};

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const boards = (await Board.find({ owner })) || [];
  res.status(200).json(boards);
};

const getBoardById = async (req, res) => {
  // var 1 ============================================
  // const { id: _id } = req.params;
  // const { _id: userId } = req.user;
  // const board = await Board.findOne({ _id });
  // if (!board) throw handleHttpError(404, `Board with id ${_id} not found`);

  // const boards = _id;
  // const columns = (await Column.find({ boards })) || [];
  // const tasks = (await Task.find({ boards })) || [];
  
  // await User.findByIdAndUpdate(userId, { currentBoard: _id });
  // res.status(200).json({ ...board._doc, columns, tasks });

  // var 2 =============================================
  const { id: _id } = req.params;
  const board = await Board.findOne({ _id }).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
    },
  });
  if (!board) throw handleHttpError(404, `Board with id ${_id} not found`);
  res.status(200).json(board);
  // ====================================================
};

module.exports = {
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
  getAllBoards: ctrlWrapper(getAllBoards),
  getBoardById: ctrlWrapper(getBoardById),
};
