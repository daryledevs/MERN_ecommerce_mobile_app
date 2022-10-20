const express = require("express");
const router = express.Router();
const { getAllUser, createUser } = require("../controller/User");

router.get("/", getAllUser);
router.post("/", createUser);

module.exports = router;