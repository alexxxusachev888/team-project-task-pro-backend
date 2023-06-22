const express = require('express');
const router = express.Router();

const { createColumn, updateColumn, deleteColumn, /* getAllColumns, getColumnById */} = require('../controllers/columns');
const { validateSchema, authenticate } = require('../middlewares');
const { columnSchemaJoi, columnUpdateSchemaJoi } = require('../models/column');

router.use(authenticate);
/* 
router.get('/:boardId/columns', getAllColumns);
router.get('/:boardId/columns/:id', getColumnById); */

router.post('/:boardId/columns', validateSchema(columnSchemaJoi), createColumn);
router.patch('/:boardId/columns/:id', validateSchema(columnUpdateSchemaJoi), updateColumn);
router.delete('/:boardId/columns/:id', deleteColumn);

module.exports = router;