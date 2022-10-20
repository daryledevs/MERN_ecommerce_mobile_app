const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  userLogIn,
  getNumberOfUser,
} = require("../controller/User");

router.get("/", getAllUser);
router.get("/get/count", getNumberOfUser);
router.post("/register", createUser);
router.post("/login", userLogIn);

module.exports = router;