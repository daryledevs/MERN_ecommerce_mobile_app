const { Address } = require("../model/UserAddress");

const getAllUserAddress = async (req, res) => {
  const { user_id } = req.params;
  const usersAddress = await Address.find({ user_id });
  if(!usersAddress) return res
    .send(404)
    .send({ message: "User addresses were not found. ", success: false });

  res.status(200).send(usersAddress);
};

const addNewAddress = async (req, res) => {
  const { user_id } = req.params;
  const new_instance = new Address({ user_id: user_id, ...req.body });
  
  new_instance
    .save()
    .then((new_address) => {
      res
        .status(200)
        .send({
          message: "Success adding new address",
          user_address: new_address,
        });
    })
    .catch((error) => {
      res.status(500).send({ message: "Add new address failed", error: error.message });
    });
};

const editAddress = async (req, res) => {
  const { address_id } = req.params;
  Address.findOneAndUpdate({ _id: address_id }, { ...req.body }, { new: true })
    .then((userAddress) => {
      res.status(200).send(userAddress);
    })
    .catch((error) => {
      res.status(500).send({ message: "Edit address failed", error: error.message });
    });
};

const deleteAddress = async (req, res) => {
  const { address_id } = req.params;
  Address.findByIdAndRemove({ _id: address_id })
    .then((deletedAddress) => {
      res.status(200).send(deletedAddress);
    })
    .catch((error) => {
      res.status(500).send({ message: "Delete address failed", error: error.message });
    })
};

module.exports = {
  getAllUserAddress,
  addNewAddress,
  editAddress,
  deleteAddress,
};