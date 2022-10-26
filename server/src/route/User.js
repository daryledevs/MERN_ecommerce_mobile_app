const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  userLogIn,
  getNumberOfUser,
  getUserByToken,
  userResetPassword,
} = require("../controller/User");

router.get("/", getAllUser);
router.get("/get/count", getNumberOfUser);
router.get("/token", getUserByToken);
router.post("/register", createUser);
router.post("/login", userLogIn);
router.post("/reset-password", userResetPassword);

module.exports = router;