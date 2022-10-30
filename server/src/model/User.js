const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
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
  house_number: {
    type: Number,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    default: "",
  },
  
  zip: {
    type: String,
    default: "",
  },
  
  creation_time:{
    type: Number,
    required: true
  },

  last_time_sign_in:{
    type: Number,
    default: 0
  }
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
})
.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);