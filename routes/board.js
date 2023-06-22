const express = require('express');
const router = express.Router();

const {
  getTestBoardOne,
  getTestBoardTwo,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
} = require('../controllers');
const { authenticate, validateSchema } = require('../middlewares');
const { boardCreateSchema, boardUpdateSchema } = require('../models');

router.use(authenticate);

router.get('/test', getTestBoardOne);
router.get('/test2', getTestBoardTwo);

router.post('/create', validateSchema(boardCreateSchema), createBoard);
router.patch('/update/:id', validateSchema(boardUpdateSchema), updateBoard);
router.delete('/delete/:id', deleteBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);

module.exports = router;
