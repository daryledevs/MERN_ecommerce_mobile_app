const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  quantity:{
    type: Number,
    default: 0,
  },

  date_added:{
    type: Number,
    default: Date.now(),
  }
});


exports.Cart = mongoose.model("Cart", cartSchema);