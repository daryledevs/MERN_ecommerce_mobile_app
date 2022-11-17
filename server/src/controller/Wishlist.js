const { Wishlist }  = require("../model/Wishlist");

// Check to see if the user already likes the product. 
const status = async (req, res) => {
  const { product_id, user_id } = req.params;
  const like = await Wishlist.find({ product_id, user_id });
  res.json({ isLike: like.length !== 0 ? true : false });
};

// get a certain number of likes for the product 
const countLike = async (req, res) => {
  const { product_id } = req.params;
  const wishlist = await Wishlist.find({ product_id });
  res.json({ count_likes: wishlist ? wishlist.length : 0 }); // if undefined, set to zero
};


// get all the user's wishlists.
const usersLike = async (req, res) => {
  const { user_id } = req.params;
  const usersWishlist = await Wishlist.find({ user_id }).populate("product_id");
  res.json({ like_list: usersWishlist });
};


// like or unlike the product in one function.
const like_unlike = async (req, res) => {
  const { product_id, user_id } = req.params;
  
  const wishlist = await Wishlist.findOne({ product_id, user_id });
  
  // undefined, it means it doesn't exist yet. Then create a new instance.
  if(!wishlist){
    const new_wishlist = new Wishlist({
      product_id: product_id,
      user_id: user_id,
    });

    new_wishlist
      .save()
      .then(() => {
        res.json({ isLike: true });
      })
      .catch(() => {
        res.status(500).send("Something went wrong.")
      });

  } else{
    // If it exists, then delete the target instance.
    Wishlist.findOneAndDelete(wishlist._id)
      .then(() => {
        res.json({ isLike: false });
      })
      .catch((error) => {
        res.send(error);
      });
  }

};


module.exports = {
  like_unlike,
  status,
  countLike,
  usersLike,
};