const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controller/Product");
const uploadImage = require("../helper/multer");

const uploadOption = uploadImage("./src/uploads/product");

router.get("/", getAllProducts);

router.post("/", uploadOption.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 7 }
]), createProduct);

router.put(
  "/update/:id",
  uploadOption.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 7 },
  ]),
  updateProduct
);

module.exports = router;