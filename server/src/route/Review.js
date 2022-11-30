const express = require("express");
const {
  user_review,
  edit_review,
  delete_review,
  product_reviews,
} = require("../controller/Review");
const router = express.Router();


router.get("/:product_id", product_reviews);
router.post("/:product_id/:user_id", user_review);
router.put("/:review_id", edit_review);
router.delete("/:review_id", delete_review);

module.exports = router;