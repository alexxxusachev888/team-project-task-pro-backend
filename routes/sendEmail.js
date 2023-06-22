const express = require("express");
const router = express.Router();

const { authenticate, validateUser } = require("../middlewares");
const { sendEmailSchemaJoi } = require("../models/sendEmail");

const { sendEmail } = require("../controllers/sendEmail");

router.post("/", authenticate, validateUser(sendEmailSchemaJoi), sendEmail);

module.exports = router;
