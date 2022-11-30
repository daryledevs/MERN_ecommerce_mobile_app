const { Review } = require("../model/Review");
const { Product } = require("../model/Product");
const { User } = require("../model/User");

// get all product reviews including comments and ratings
const product_reviews = async (req, res) =>{
  const { product_id } = req.params;
  const reviews = await Review.find({ product_id }).populate("user_id");
  const total_review = reviews.length;

  let one_star = 0,
    two_star = 0,
    three_star = 0,
    four_star = 0,
    five_star = 0,
    star_value = 0;

  if(!reviews) return res.status(404).send({ review: reviews, message: "Review not found" });
  
  for(let i = 0; i < reviews.length; i++){
    switch (reviews[i].product_rating) {
      case 1:
        one_star += 1;
        star_value += 1;
        break;

      case 2:
        two_star += 1;
        star_value += 2;
        break;

      case 3:
        three_star += 1;
        star_value += 3;
        break;

      case 4:
        four_star += 1;
        star_value += 4;
        break;

      case 5:
        five_star += 1;
        star_value += 5;
        break;
    }
  }
  console.log(
    five_star,
    five_star / total_review || (0).toFixed(2),
    ((five_star / total_review) * 100).toFixed(2) || 0
  );
  res.status(200).send({
    reviews: reviews,
    total_review: total_review,
    total_ratings: ((star_value / total_review)  || 0).toFixed(1),
    five_star:     (((five_star / total_review)  || 0)  * 100).toFixed(2),
    four_star:     (((four_star / total_review)  || 0)  * 100).toFixed(2),
    three_star:    (((three_star / total_review) || 0)  * 100).toFixed(2),
    two_star:      (((two_star / total_review)   || 0)  * 100).toFixed(2),
    one_star:      (((one_star / total_review)   || 0)  * 100).toFixed(2),
  });
};

// create reviews for the product
const user_review = async (req, res) => {
  const { product_id, user_id } = req.params;
  const isUserExist = await User.findById(user_id);
  const isProductExist = await Product.findById(product_id);

  if(!isUserExist && !isProductExist) return res
    .status(404)
    .send({
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
      res.status(200).send("Delete successfully!");
    })
    .catch((error) => {
      res.status(404).send({ message: "Delete unsuccessful.", error: error.message});
    });
};

module.exports = {
  user_review,
  product_reviews,
  delete_review,
};