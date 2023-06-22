const express = require("express");
const router = express.Router();

const { authenticate, validateSchema } = require("../middlewares");
const { sendEmailSchemaJoi } = require("../models/sendEmail");

const { sendEmail } = require("../controllers/sendEmail");

router.post("/", authenticate, validateSchema(sendEmailSchemaJoi), sendEmail);

module.exports = router;
