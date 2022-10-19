const { Product } = require("../model/Product");
const { Category } = require("../model/Category");

const getAllProducts = async (req, res) => {
  const productList = await Product.find();
  if(!productList) return res.status(500).json({ success: false });
  res.status(200).send(productList);
}

const createProduct = async (req, res) => {
  const body = req.body;
  const categoryId = req.body.category;
  const isCategoryExist = await Category.findById(categoryId);
  
  if(!isCategoryExist) return res.status(404).json({ success: false, message: "Invalid category." })
  if (!body) return res.status(500).json({ success: false });

  const newProduct = new Product({ ...body });
  newProduct.save()
    .then((createdProduct) => {
      if(!createdProduct) return res.status(500).json({ success: false });
      res.send(createdProduct);
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error})
    })
}

module.exports = { getAllProducts, createProduct };