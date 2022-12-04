const mongoose = require("mongoose");

const userAddressSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  house_number: {
    type: Number,
    default: null,
  },

  street: {
    type: String,
    default: "",
  },

  barangay: {
    type: Number,
    default: null,
  },

  subdivision: {
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

  zip_code: {
    type: Number,
    default: null,
  },
});


exports.Address = mongoose.model("Address", userAddressSchema);