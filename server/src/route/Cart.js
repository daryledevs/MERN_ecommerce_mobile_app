const express = require("express");
const { getUserCart, addToCart, removeCart } = require("../controller/Cart");
const router = express.Router();

router.get("/:user_id", getUserCart);
router.post("/:product_id/:user_id", addToCart);
router.delete("/:cart_id", removeCart);

module.exports = router;