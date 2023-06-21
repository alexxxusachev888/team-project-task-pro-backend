const express = require('express');
const router = express.Router();

const { createBoard, updateBoard, deleteBoard, updateBoardIconBackground} = require('../controllers/boards');
const { authenticate } = require('../middlewares');

router.use(authenticate);

router.post('/', createBoard);
router.patch('/:id', updateBoard);
router.delete('/:id', deleteBoard);

router.patch('/:boardId/icon-background', updateBoardIconBackground);

module.exports = router;