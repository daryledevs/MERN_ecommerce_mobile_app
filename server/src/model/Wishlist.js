const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true, 
  },

  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});


exports.Wishlist = mongoose.model("Wishlist", wishlistSchema);