const express = require("express");
const router = express.Router();
const { getAllUser, createUser, userLogIn } = require("../controller/User");

router.get("/", getAllUser);
router.post("/", createUser);
router.post("/login", userLogIn);

module.exports = router;