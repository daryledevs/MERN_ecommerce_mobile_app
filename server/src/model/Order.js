const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order_item_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderItem",
    required: true,
  }],

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  payment_method:{
    type: String,
    required: true,
  },

  date_ordered: {
    type: Number,
    default: Date.now(),
  },

  date_shipment_arrival: {
    type: Number,
    default: null,
  },

  shipped_place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
});

exports.Order = mongoose.model("Order", orderSchema);