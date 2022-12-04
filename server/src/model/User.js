const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  given_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  address_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  
  creation_time: {
    type: Number,
    default: null
  },

  last_time_sign_in: {
    type: Number,
    default: null,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
})
.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);