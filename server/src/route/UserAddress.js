const express = require("express");
const {
  getAllUserAddress,
  addNewAddress,
  editAddress,
  deleteAddress,
} = require("../controller/UserAddress");
const router = express.Router();


router.get("/:user_id", getAllUserAddress);
router.post("/:user_id", addNewAddress);
router.put("/:address_id", editAddress);
router.delete("/:address_id", deleteAddress);

module.exports = router;