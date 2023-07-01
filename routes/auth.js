const express = require("express");
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSchema}} = require("../models/user");
const { validateSchema, authenticate, uploadCloud } = require("../middlewares");
const { register, login, logout, update, avatarUpdate, getCurrentUser, refreshToken } = require("../controllers/auth");

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

router.patch("/", authenticate, validateSchema(updateSchema), update);
router.patch("/avatar", authenticate, uploadCloud.single("avatarImage"), avatarUpdate);

router.post("/refreshToken", authenticate, refreshToken);

module.exports = router;