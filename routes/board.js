const express = require("express");
const router = express.Router();
const getTemplate = require("../controllers/board");

router.get("/template", getTemplate);

module.exports = router;