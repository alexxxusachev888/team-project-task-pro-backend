const express = require('express');
const router = express.Router();

const {
  getAllBoardTest,
  getBoardByIdTest1,
  getBoardByIdTest2,
} = require('../controllers/boardsTest');

router.get('/', getAllBoardTest);
router.get('/test1/:id', getBoardByIdTest1);
router.get('/test2/:id', getBoardByIdTest2);

module.exports = router;
