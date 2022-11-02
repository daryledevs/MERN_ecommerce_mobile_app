const { Product } = require("../model/Product");
const { Category } = require("../model/Category");

const getAllProducts = async (req, res) => {
  const productList = await Product.find().populate("category");
  if(!productList) return res.status(500).json({ success: false });
  res.status(200).send(productList);
}

const createProduct = async (req, res) => {
  const body = req.body;
  const categoryId = req.body.category;
  const isCategoryExist = await Category.findById(categoryId);
  const filename = req.file.filename;
  // req.protocol is "http/https", req.get("host") is simply the localhost port (i.e "5000")
  const basePath = `${req.protocol}://${req.get("host")}/uploads/product`;

  if (!isCategoryExist) return res.status(404).json({ success: false, message: "Invalid category." });
  if (!body) return res.status(500).json({ success: false });

  const newProduct = new Product({
    ...body,
    // We need to specify this for the frontend to know where this can be retrieved
    image: `${basePath}${filename}`,
  });

  newProduct
    .save()
    .then((createdProduct) => {
      if (!createdProduct) return res.status(500).json({ success: false });
      res.send(createdProduct);
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: error });
    });
}

module.exports = { getAllProducts, createProduct };