const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  userLogIn,
  getNumberOfUser,
  getUserByToken,
  userResetPassword,
  deleteAccount,
  userLogout,
} = require("../controller/User");

router.get("/", getAllUser);
router.get("/get/count", getNumberOfUser);
router.get("/token", getUserByToken);
router.get("/logout/:id", userLogout);
router.post("/register", createUser);
router.post("/login", userLogIn);
router.post("/reset-password", userResetPassword);
router.delete("/delete/account/:id", deleteAccount);

module.exports = router;