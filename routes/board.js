const express = require('express');
const router = express.Router();

const { createBoard, updateBoard, deleteBoard, updateBoardIconBackground} = require('../controllers/boards');
const { createColumn,updateColumn,deleteColumn } = require('../controllers/columns');
const { createTask, updateTask, deleteTask, filterTasksByPriority } = require('../controllers/tasks');

const { validateBoardColumnTask } = require('../middlewares');
const { boardSchema, columnSchema, taskSchema } = require('../models/board');
const { authenticate } = require('../middlewares');

router.use(authenticate);

router.post('/', validateBoardColumnTask(boardSchema), createBoard);
router.patch('/:id', validateBoardColumnTask(boardSchema), updateBoard);
router.patch('/:boardId/icon-background', authenticate, updateBoardIconBackground);
router.delete('/:id', deleteBoard);

router.post('/:boardId/columns', validateBoardColumnTask(columnSchema), createColumn);
router.patch('/:boardId/columns/:id', validateBoardColumnTask(columnSchema), updateColumn);
router.delete('/:boardId/columns/:id', deleteColumn);

router.post('/:boardId/columns/:columnId/tasks', validateBoardColumnTask(taskSchema), createTask);
router.patch('/:boardId/columns/:columnId/tasks/:id', validateBoardColumnTask(taskSchema), updateTask);
router.delete('/:boardId/columns/:columnId/tasks/:id', deleteTask);
router.get('/:boardId/tasks/filter/:priority', filterTasksByPriority);


module.exports = router;