const { Order } = require("../model/Order");
const { OrderItem } = require("../model/OrderItem");
const { Cart } = require("../model/Cart");

const getAllUsersOrder = async (req, res) => {
  const { user_id } = req.params;
  const ordered_items = await Order.find({ user_id }).populate({
    path: "order_item_id",
    populate: {
      path: "product",
      select: "_id name image product_seller price",
    },
  });
  res.status(200).send(ordered_items);
};

const createOrder = async (req, res) => {
  const user_ordered_items = req.body.ordered_items.map((item) => { return item });
  // need to return as a value only, not an object, else we will get an error at line 33
  // i.e. [ '635a4121f47a4349bdab94bb', '635a412cf47a4349bdab94be' ] (Product ID)
  const product_ids = user_ordered_items.map(({ product }) => {
    return product;
  });
  const order_items = await OrderItem.insertMany(user_ordered_items);
  // get all the IDs for each items being saved from OrderItem same as from line 18
  // i.e. [ '639db32fdf7552357e65c929', '639db32fdf7552357e65c92a' ] (OrderedItem ID)
  const order_item_ids = order_items.map((item) => { return item._id });

  const new_instance = await Order({
    order_item_id: order_item_ids,
    user_id: req.body.user_id,
    payment_method: req.body.payment_method,
    date_ordered: req.body.date_ordered,
    shipped_place: req.body.address,
  });

  // delete the items from the user's cart
  await Cart.deleteMany({
    product_id: product_ids,
    user_id: req.body.user_id,
  });

  new_instance
    .save()
    .then(async (user_ordered_details) => {
      const populated_data = await user_ordered_details.populate({
        path: "order_item_id",
        populate: {
          path: "product",
          select: "_id name image product_seller price",
        },
      });
      res.status(200).send(populated_data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send({ message: "Create order failed", error: error.message });
    })
};

module.exports = {
  getAllUsersOrder,
  createOrder,
};  