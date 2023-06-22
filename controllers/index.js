const { register, login, logout, update, avatarUpdate, getCurrentUser } = require('./auth');
const { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } = require('./boards');
const { createColumn, getColumns, getColumnById, updateColumn, deleteColumn } = require('./columns');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('./tasks');
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
};
