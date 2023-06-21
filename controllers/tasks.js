const { Task } = require("../models/task");
const { ctrlWrapper, handleHttpError } = require("../helpers");

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findById(id);
  if (!result) {
    throw handleHttpError(404, `Contact with id: ${id} is not found`);
  }
  res.json(result);
};

const createTask = async (req, res) => {
  const result = await Task.create(req.body);
  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} is not found`);
  }
  res.json(result);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} is not found`);
  }
  res.status(204).send();
};

const filterTasksByPriority = async (req, res) => {
  const { priority, columnId } = req.params;
  const result = Task.find({ column: columnId, priority });
  res.json(result);
};

module.exports = {
  createTask: ctrlWrapper(getTaskById),
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
  filterTasksByPriority: ctrlWrapper(filterTasksByPriority),
};
