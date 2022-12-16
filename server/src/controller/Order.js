const { Order } = require("../model/Order");
const { OrderItem } = require("../model/OrderItem");

const getAllUsersOrder = async (req, res) => {
  const { user_id } = req.params;
  const ordered_items = await Order.find({ user_id }).populate({
    path: "order_item_id", populate:{
      path: "product", select: "_id name"
    }
  })
  res.status(200).send(ordered_items);
};

const createOrder = async (req, res) => {
  const user_ordered_items = req.body.ordered_items.map(item => { return item });
  const order_items = await OrderItem.insertMany(user_ordered_items);
  const order_item_ids = order_items.map(item => { return item._id });
  const new_instance = await Order({
    order_item_id: order_item_ids,
    user_id: req.body.user_id,
    payment_method: req.body.payment_method,
    date_ordered: req.body.date_ordered,
    shipped_place: req.body.address,
  });

  new_instance
  .save()
  .then((user_ordered_details) => {
    res.status(200).send(user_ordered_details);
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