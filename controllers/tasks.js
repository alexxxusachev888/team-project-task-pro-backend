const { Task } = require("../models/task");
const { ctrlWrapper, handleHttpError } = require("../helpers");

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw handleHttpError(404, `Task with id: ${id} is not found`);
  }
  res.json(result);
};

const createTask = async (req, res) => {
  const { boardId, columnId } = req.params;
  const result = await Task.create({
    ...req.body,
    board: boardId,
    column: columnId,
  });
  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw handleHttpError(404, `Task with id: ${id} is not found`);
  }
  res.json(result);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw handleHttpError(404, `Task with id: ${id} is not found`);
  }
  res.status(204).send();
};

const filterTasksByPriority = async (req, res) => {
  const { priority, columnId } = req.params;
  const result = await Task.find({ column: columnId, priority });
  res.json(result);
};

module.exports = {
  getTaskById: ctrlWrapper(getTaskById),
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
  filterTasksByPriority: ctrlWrapper(filterTasksByPriority),
};
