const {
  register,
  login,
  logout,
  update,
  avatarUpdate,
  getCurrentUser,
} = require('./auth');
const {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  getCurrentBoard,
  setCurrentBoard,
} = require('./boards');
const {
  createColumn,
  getColumnsByBoardId,
  updateColumn,
  deleteColumn,
} = require('./columns');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  filterTasksByPriority,
} = require('./tasks');

const { sendEmail } = require('./sendEmail');
const { getAllMiniImg, getMiniImgById } = require('./miniImages');
const { getAllBackground, getBackgroundById } = require('./backgrounds');

module.exports = {
  register,
  login,
  logout,
  update,
  avatarUpdate,
  getCurrentUser,
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  createColumn,
  getColumnsByBoardId,
  updateColumn,
  deleteColumn,
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sendEmail,
  filterTasksByPriority,
  setCurrentBoard,
  getCurrentBoard,
  getAllMiniImg,
  getMiniImgById,
  getAllBackground,
  getBackgroundById,
};
