const { ctrlWrapper, handleHttpError } = require('../helpers');
const { Board } = require('../models/board');
const { Task } = require('../models/task');
const { Column } = require('../models/column');

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

  let boards = await Board.find({ owner });
  boards = boards ? boards : [];
  res.status(200).json(boards);
};

const getBoardByID = async (req, res) => {
  const { _id: owner } = req.user;

  let columns = await Column.find({ owner });
  let tasks = await Task.find({ owner });

  columns = columns ? columns : [];
  tasks = tasks ? tasks : [];

  res.status(200).json({ columns, tasks });
};

module.exports = {
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
  getAllBoards: ctrlWrapper(getAllBoards),
  getBoardByID: ctrlWrapper(getBoardByID),
};
