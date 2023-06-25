const express = require('express');
const router = express.Router();

const {
  createBoard,
  updateBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  getCurrentBoard,
  setCurrentBoard,
} = require('../controllers');
const { authenticate, validateSchema } = require('../middlewares');
const { boardCreateSchema, boardUpdateSchema } = require('../models');
const {
  schemas: { currentBoardSchema },
} = require('../models/user');

router.use(authenticate);

router.post('/create', validateSchema(boardCreateSchema), createBoard);
router.patch('/update/:id', validateSchema(boardUpdateSchema), updateBoard);
router.delete('/delete/:id', deleteBoard);
router.get('/', getAllBoards);
router.get('/getById/:id', getBoardById);
router.patch(
  '/setCurrent',
  validateSchema(currentBoardSchema),
  setCurrentBoard
);
router.get('/getCurrent', getCurrentBoard);

module.exports = router;
