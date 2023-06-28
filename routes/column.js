const express = require('express');
const router = express.Router();

const { createColumn, getColumnsByBoardId, updateColumn, deleteColumn } = require('../controllers');
const { validateSchema, authenticate } = require('../middlewares');
const { columnSchemaJoi, columnUpdateSchemaJoi } = require('../models');

router.use(authenticate);

router.get('/:boardId', getColumnsByBoardId)
router.post('/:boardId', validateSchema(columnSchemaJoi), createColumn);
router.patch('/:id', validateSchema(columnUpdateSchemaJoi), updateColumn);
router.delete('/:id', deleteColumn);

module.exports = router;