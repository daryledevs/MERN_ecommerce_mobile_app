const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct } = require("../controller/Product");

router.get("/", getAllProducts);
router.post("/", createProduct);


module.exports = router;