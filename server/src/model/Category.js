const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  // id: String,
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  // image: {},
});

exports.Category = mongoose.model("Category", categorySchema);
