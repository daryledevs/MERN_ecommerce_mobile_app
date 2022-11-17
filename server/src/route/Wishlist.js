const express = require("express");
const router = express.Router();
const {
  like_unlike,
  status,
  countLike,
  usersLike,
} = require("../controller/Wishlist");

router.get("/status/:product_id/:user_id", status);
router.get("/count-like/:product_id", countLike);
router.get("/users-like/:user_id", usersLike);
router.patch("/like-unlike/:product_id/:user_id", like_unlike);

module.exports = router;