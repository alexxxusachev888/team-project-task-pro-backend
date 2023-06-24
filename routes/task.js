const express = require("express");
const router = express.Router();

const { validateSchema, authenticate } = require("../middlewares");
const {
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  filterTasksByPriority,
} = require("../controllers/tasks");

const { taskSchemaJoi, taskUpdateSchemaJoi } = require("../models");

router.use(authenticate);

router.get("/:id", getTaskById);

router.post("/:boardId/:columnId", validateSchema(taskSchemaJoi), createTask);
router.patch("/:id", validateSchema(taskUpdateSchemaJoi), updateTask);
router.delete("/:id", deleteTask);
router.get("/:priority/:columnId", filterTasksByPriority);

module.exports = router;
