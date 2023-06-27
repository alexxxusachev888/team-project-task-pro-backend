const { ctrlWrapper, handleHttpError } = require('../helpers');
const { Column } = require('../models');
const { Task } = require('../models');

const createColumn = async (req, res) => {
  const { boardId } = req.params;
  const savedColumn = await Column.create({ ...req.body, board: boardId });
  res.status(201).json(savedColumn);
};

const updateColumn = async (req, res) => {
  const { id } = req.params;

  const updatedColumn = await Column.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedColumn) throw handleHttpError(404, 'Column not found');

  res.json(updatedColumn);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;

  const column = await Column.findById(id);
  if (!column) throw handleHttpError(404, 'Column not found');

  const tasks = (await Task.find({ column })) || [];

  tasks.forEach(async (task) => {
    await Task.findByIdAndDelete(task._id);
  });

  const deletedColumn = await Column.findByIdAndDelete(id);

  res.json({ message: 'Column deleted' });
};

module.exports = {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
