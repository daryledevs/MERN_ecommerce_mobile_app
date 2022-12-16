const express = require("express");
const { createOrder, getAllUsersOrder } = require("../controller/Order");
const router = express.Router();

router.get("/:user_id", getAllUsersOrder);
router.post("/", createOrder);

module.exports = router;