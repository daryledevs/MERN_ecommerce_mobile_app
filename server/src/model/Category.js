const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description:{
    type: String,
    default: "",
  },
  
  // subCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "SubCategory",
  //   required: true
  // },
});

exports.Category = mongoose.model("Category", categorySchema);
