const express = require("express");
const router = express.Router();

const { validateTask, authenticate } = require("../middlewares");
const {
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  filterTasksByPriority,
} = require("../controllers/tasks");
const { taskSchemaJoi, taskUpdateSchemaJoi } = require("../models/task");

router.use(authenticate);

router.get("/:id", getTaskById);
router.post("/", validateTask(taskSchemaJoi), createTask);
router.patch("/:id", validateTask(taskUpdateSchemaJoi), updateTask);
router.delete("/:id", deleteTask);
router.get("/:priority:columnId", filterTasksByPriority);

module.exports = router;
