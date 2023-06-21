const { ctrlWrapper } = require("../helpers");

const createTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const filterTasksByPriority = async (req, res) => {}
  
module.exports = {
    createTask: ctrlWrapper(createTask),
    updateTask: ctrlWrapper(updateTask),
    deleteTask: ctrlWrapper(deleteTask),
    filterTasksByPriority: ctrlWrapper(filterTasksByPriority),
  };