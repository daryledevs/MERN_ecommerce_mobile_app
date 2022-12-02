const express = require("express");
const {
  getUserCart,
  addToCart,
  removeCart,
  productCartQuantity,
} = require("../controller/Cart");
const router = express.Router();

router.get("/:user_id", getUserCart);
router.post("/:product_id/:user_id", addToCart);
router.put("/:product_id/:user_id", productCartQuantity);
router.delete("/:product_id/:user_id", removeCart);

module.exports = router;