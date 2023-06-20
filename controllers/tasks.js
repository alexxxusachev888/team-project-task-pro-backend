const { ctrlWrapper, handleHttpError } = require("../helpers");
const { User } = require('../models/user');

const createTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const filterTasksByPriority = async (req, res) => {
  const { boardId, priority } = req.params;

      const user = await User.findOne({ "boards._id": boardId });

      if (!user) {
          return res.status(404).send({ message: 'Board not found' });
      }

      const board = user.boards.id(boardId);

      board.columns.forEach(column => {
          column.tasks.sort((a, b) => {
              switch (priority) {
                  case 'low':
                      return a.priority === 'low' && b.priority !== 'low' ? -1 : 1;
                  case 'medium':
                      return a.priority === 'medium' && b.priority !== 'medium' ? -1 : 1;
                  case 'high':
                      return a.priority === 'high' && b.priority !== 'high' ? -1 : 1;
                  default:
                      return 0;
              }
          });
      });

      res.json(board);
}
  
module.exports = {
    createTask: ctrlWrapper(createTask),
    updateTask: ctrlWrapper(updateTask),
    deleteTask: ctrlWrapper(deleteTask),
    filterTasksByPriority: ctrlWrapper(filterTasksByPriority),
  };