const { Product } = require("../model/Product");
const { Category } = require("../model/Category");
const { Review } = require("../model/Review");
const regex_removeWhiteSpaces = /\s/g;

const getAllProducts = async (req, res) => {
  let productList = [];
  await Product.find().populate("category")
    .then(async (product) => {
      if(!product) return res.status(500).json({message: "Product undefined", success: false });
      for (let j = 0; j < product.length; j++) {
        let star_value = 0;
        const reviews = await Review.find({ product_id: product[j]._id });
        const total_review = reviews.length;
        for (let i = 0; i < reviews.length; i++) {
          switch (reviews[i].product_rating) {
            case 1:
              star_value += 1;
              break;

            case 2:
              star_value += 2;
              break;

            case 3:
              star_value += 3;
              break;

            case 4:
              star_value += 4;
              break;

            case 5:
              star_value += 5;
              break;
          }
        }

        productList.push({
          product: product[j],
          total_review: total_review,
          total_ratings: (star_value / total_review || 0).toFixed(1),
        });
      }
    })

  res.status(200).send(productList);
};

const createProduct = async (req, res) => {
  const body = req.body;
  const categoryId = req.body.category;
  const isCategoryExist = await Category.findById(categoryId);
  
  const image =
    req.files?.image[0].originalname.replace(regex_removeWhiteSpaces, "_") 
    || ""; // if undefined, then set the value to "" or blank

  const images = req.files?.images || "";
  const imagePath = [];
  
  // req.protocol is "http/https", req.get("host") is simply the localhost port (i.e "5000")
  const basePath = `${req.protocol}://${req.get("host")}/uploads/product`;

  if (!isCategoryExist) return res.status(404).json({ success: false, message: "Invalid category." });
  if (!body) return res.status(500).json({ success: false });

  if(images !== "") images.map((image) =>
    imagePath.push(
      `${basePath}${image.originalname.replace(regex_removeWhiteSpaces, "_")}`
    )
  );

  const image_value = image !== "" ? `${basePath}${image}` : "";
  const images_value = images !== "" ? imagePath : "";

  const newProduct = new Product({
    ...body,
    // We need to specify this for the frontend to know where this can be retrieved
    image: image_value,
    images: images_value,
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
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const image =
    // req.files.image?.[0] to avoid error "Cannot read properties of undefined (reading '0')"
    req.files.image?.[0].originalname.replace(regex_removeWhiteSpaces, "_") ||
    ""; // if undefined, then set the value to "" or blank

  const images = req.files?.images || "";
  const imagePath = [];

  const basePath = `${req.protocol}://${req.get("host")}/uploads/product`;

  if (images !== "")
    images.map((image) =>
      imagePath.push(
        `${basePath}${image.originalname.replace(regex_removeWhiteSpaces, "_")}`
      )
    );

  const image_value = image !== "" ? `${basePath}${image}` : "";

  function check() {
    if (image_value !== "" && imagePath.length !== 0)
      return { ...body, image: image_value, images: imagePath };
    if (image_value !== "") return { ...body, image: image_value };
    if (imagePath.length !== 0) return { ...body, images: imagePath };

    return { ...body };
  }

  let options = check();

  const productDetails = await Product.findByIdAndUpdate(
    { _id: id }, options, { new: true }
  );

  if (!productDetails) return res.status(404).send("Product not found.");
  res.status(200).send(productDetails);
};;

module.exports = { getAllProducts, createProduct, updateProduct };