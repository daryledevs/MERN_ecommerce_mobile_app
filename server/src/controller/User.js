const { User } = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res) => {
  const userList = await User.find();
  
  if (!userList) return res.status(500).json({ success: false, message: "No users found." });
  res.status(200).send(userList);
};

const createUser = async (req, res) => {
  const body = req.body;
  const userPassword = req.body.password;

  const newUser = new User({
    ...body,
    passwordHash: bcrypt.hashSync(userPassword, 10),
  });

  newUser
    .save()
    .then((createdUser) => {
      res.status(200).send(createdUser);
    })
    .catch((error) => {
      res.status(500).json({ success: false, error });
    });
};

module.exports = { getAllUser, createUser };
