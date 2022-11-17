const express = require("express");
const {
  user_review,
  product_reviews,
  delete_review,
} = require("../controller/Review");
const router = express.Router();


router.get("/:product_id", product_reviews);
router.post("/:product_id/:user_id", user_review);
router.delete("/delete-review/:review_id", delete_review);

module.exports = router;