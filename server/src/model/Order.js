const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  date_ordered: {
    type: Number,
    default: Date.now(),
  },

  date_shipment_arrival: {
    type: Number,
    default: Date.now(),
  },

  shipped_place: {
    house_number: {
      type: Number,
      default: null,
    },

    street: {
      type: String,
      default: "",
    },

    subdivision: {
      type: String,
      default: "",
    },

    barangay: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    province: {
      type: String,
      default: "",
    },
  },
});

exports.Order = mongoose.model("Order", orderSchema);