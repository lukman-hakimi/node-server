const express = require("express");
const router = express.Router();
const { register,login, isToken, getUserData,getAllUsers } = require("../controller/user");
const authMiddleware = require('../middleware/auth');

router.post("/register", register);
router.post("/login", login);
router.post("/isTokenValid", isToken);
router.get("/", authMiddleware,  getUserData);

module.exports = router;