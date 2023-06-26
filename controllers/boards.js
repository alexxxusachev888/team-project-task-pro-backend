const { ctrlWrapper, handleHttpError } = require('../helpers');
const { Board } = require('../models/board');
const { Task } = require('../models/task');
const { Column } = require('../models/column');
const { populate } = require('dotenv');
const { User } = require('../models/user');

const createBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { title } = req.body;

  const board = await Board.findOne({ owner, title });
  if (board) throw handleHttpError(400, 'This board title is allready in use');

  const newBoard = await Board.create({ ...req.body, owner });

  const currentBoard = newBoard._id;
  await User.findByIdAndUpdate(owner, { currentBoard }, { new: true });

  const savedBoard = await Board.findById(currentBoard);

  res.status(201).json(savedBoard);
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
  const { id: board } = req.params;
  const { _id: userId } = req.user;

  const currentBoard = await Board.findById(board);
  if (!currentBoard)
    throw handleHttpError(404, `Board with id ${board} not found`);

  await User.findByIdAndUpdate(
    userId,
    { currentBoard: board },
    {
      new: true,
    }
  );
  const columns = (await Column.find({ board })) || [];
  const tasks = (await Task.find({ board })) || [];

  res.status(200).json({ ...board._doc, columns, tasks });
};

const getCurrentBoard = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const currentBoardId = user.currentBoard;
  res.status(200).json({ currentBoardId });
};

module.exports = {
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
  getAllBoards: ctrlWrapper(getAllBoards),
  getBoardById: ctrlWrapper(getBoardById),
  getCurrentBoard: ctrlWrapper(getCurrentBoard),
};
