const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct } = require("../controller/Product");
const uploadImage = require("../helper/multer");

const uploadOption = uploadImage("./src/uploads/product");

router.get("/", getAllProducts);
router.post("/", uploadOption.single("image"), createProduct);


module.exports = router;