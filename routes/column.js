const express = require('express');
const router = express.Router();

const { createColumn,updateColumn, deleteColumn } = require('../controllers/columns');
const { validateColumn, authenticate } = require('../middlewares');

router.use(authenticate);

router.post('/:boardId/columns', validateColumn, createColumn);
router.patch('/:boardId/columns/:id', validateColumn, updateColumn);
router.delete('/:boardId/columns/:id', deleteColumn);

module.exports = router;