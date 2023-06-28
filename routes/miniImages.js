const express = require("express");
const router = express.Router();

const {
  getAllMiniImg,
  getMiniImgById,
} = require("../controllers/miniImages");
const { authenticate } = require("../middlewares");

router.use(authenticate);

router.get("/", getAllMiniImg);
router.get("/:id", getMiniImgById);

module.exports = router;
