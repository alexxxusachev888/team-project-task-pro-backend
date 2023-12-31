const express = require('express');
const router = express.Router();
const {getAllBackground, getBackgroundById} = require("../controllers/backgrounds");
const {authenticate} = require('../middlewares');

router.use(authenticate);

router.get('/', getAllBackground);
router.get('/:name', getBackgroundById);

module.exports = router;
