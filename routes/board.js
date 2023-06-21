const express = require('express');
const router = express.Router();

const {
  createBoard,
  updateBoard,
  deleteBoard,
  getAllBoards,
  getBoardByID,
} = require('../controllers/boards');
const { authenticate, validateUser } = require('../middlewares');
const { boardCreateSchema, boardUpdateSchema } = require('../models/board');

router.use(authenticate);

router.post('/', validateUser(boardCreateSchema), createBoard);
router.patch('/:id', validateUser(boardUpdateSchema), updateBoard);
router.delete('/:id', deleteBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardByID);

module.exports = router;
