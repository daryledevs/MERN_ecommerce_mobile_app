const { Cart } = require("../model/Cart");
const { Product } = require("../model/Product");
const { User } = require("../model/User");

const getUserCart = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findOne({ _id: user_id });
  if(!user)  return res.status(404).send("User not found");

  const carts = await Cart.find({ user_id }).populate("product_id");
  res.status(200).send({ carts });
};

const addToCart = async (req, res) => {
  const { product_id, user_id } = req.params;
  const { quantity } = req.body;

  const product = await Product.find({ _id: product_id });
  const user = await User.find({ _id: user_id });

  if(!quantity || !product || !user) return res.status(404).send("Product or user not found");

  const new_instance = new Cart({
    product_id,
    user_id,
    quantity,
  });

  new_instance
    .save()
    .then(() => {
      res.status(200).send("Added to cart successfully");
    })
    .catch((error) => {
      res
        .status(500)
        .send({ error: error.message, message: "Add to cart failed" });
    });
};


const removeCart = async (req, res)=> {
  const { cart_id } = req.params;
  Cart.findOneAndDelete(cart_id)
    .then(() => {
      res.status(200).send("Item has been removed from cart");
    })
    .catch((error) => {
      res.status(500).send({ error: error.message, message: "Remove item failed" });
    });
};

module.exports = {
  getUserCart,
  addToCart,
  removeCart,
};