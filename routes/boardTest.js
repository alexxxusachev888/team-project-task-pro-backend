const express = require('express');
const router = express.Router();

const {
  getAllBoardTest,
  getBoardByIdTest1,
} = require('../controllers/boardsTest');

router.get('/', getAllBoardTest);
router.get('/test1/:id', getBoardByIdTest1);

module.exports = router;
