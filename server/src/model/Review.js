const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  product_rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  user_comment: {
    type: String,
    default: "",
  },
});

exports.Review = mongoose.model("Review", reviewSchema);