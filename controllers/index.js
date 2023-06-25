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
  getColumns,
  getColumnById,
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
  getColumns,
  getColumnById,
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
};
