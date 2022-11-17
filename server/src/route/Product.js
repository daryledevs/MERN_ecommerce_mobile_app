const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controller/Product");
const uploadImage = require("../middleware/multer");

const uploadOption = uploadImage("./src/uploads/product");
const option_field = [
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 7 },
];

router.get("/", getAllProducts);
router.post("/", uploadOption.fields(option_field), createProduct);
router.put("/update/:id", uploadOption.fields(option_field), updateProduct);

module.exports = router;