const { Review } = require("../model/Review");
const { Product } = require("../model/Product");
const { User } = require("../model/User");

// get all product reviews including comments and ratings
const product_reviews = async (req, res) =>{
  const { product_id } = req.params;
  const reviews = await Review.find({ product_id });
  res.send(reviews)
};

// create reviews for the product
const user_review = async (req, res) => {
  const { product_id, user_id } = req.params;
  const isUserExist = await User.findById(user_id);
  const isProductExist = await Product.findById(product_id);

  if(!isUserExist && !isProductExist) return res
    .status(404)
    .json({
      success: false,
      message: "There is neither a user nor a product. ",
    });

  const body = req.body;
  const new_instance = new Review({
    product_id: product_id,
    user_id: user_id,
    ...body,
  });

  new_instance
    .save()
    .then((created_review) => {
      res.status(200).send(created_review);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};


const delete_review = async(req, res) =>{
  const { review_id } = req.params;
  Review.findOneAndDelete({ review_id })
    .then(() => {
      res.send("Delete successfully!");
    })
    .catch((error) => {
      res.status(404).json({ message: "Delete unsuccessful.", error});
    });
};

module.exports = {
  user_review,
  product_reviews,
  delete_review,
};