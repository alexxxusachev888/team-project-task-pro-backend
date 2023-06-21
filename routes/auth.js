const express = require("express");
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSchema}} = require("../models/user");
const { validateUser, authenticate, uploadCloud } = require("../middlewares");
const { register, login, logout, update, avatarUpdate, getCurrentUser } = require("../controllers/auth");

router.post("/register", validateUser(registerSchema), register);
router.post("/login", validateUser(loginSchema), login);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

router.patch("/", authenticate, validateUser(updateSchema), update);
router.patch("/avatar", authenticate, uploadCloud.single("avatarImage"), avatarUpdate);

module.exports = router;