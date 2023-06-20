const express = require("express");
const router = express.Router();

const { schemas: { registerSchema, loginSchema, updateSchema, userEmailSchema, themeUpdateSchema }} = require("../models/user");
const { validateUser, authenticate, upload } = require("../middlewares");
const { register, login, logout, update, avatarUpdate, verify, resendVerificationEmail, getCurrentUser, updateTheme, refreshToken} = require("../controllers/auth");

router.post("/register", validateUser(registerSchema), register);
router.post("/login", validateUser(loginSchema), login);
router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

router.patch("/", authenticate, validateUser(updateSchema), update);
router.patch("/avatar", authenticate, upload.single("avatar"), avatarUpdate);
router.patch("/theme", authenticate, validateUser(themeUpdateSchema), updateTheme);

router.get("/verify/:verificationCode", verify);
router.post("/verify", validateUser(userEmailSchema), resendVerificationEmail);
router.post("/refresh", authenticate, refreshToken)


module.exports = router;