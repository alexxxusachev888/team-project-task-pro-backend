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

router.post('/create', validateUser(boardCreateSchema), createBoard);
router.patch('/update/:id', validateUser(boardUpdateSchema), updateBoard);
router.delete('/delete/:id', deleteBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardByID);

module.exports = router;
