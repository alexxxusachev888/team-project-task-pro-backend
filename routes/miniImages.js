const express = require("express");
const router = express.Router();
const {
  getAllminiImages,
  getMiniImageById,
} = require("../controllers/miniImages");
const { authenticate } = require("../middlewares");

router.use(authenticate);

router.get("/", getAllminiImages);
router.get("/:id", getMiniImageById);

module.exports = router;
