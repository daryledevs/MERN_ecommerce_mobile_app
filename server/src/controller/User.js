const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  const userList = await User.find();

  if (!userList) return res.status(404).send("No users found");
  res.send(userList);
};

const getUserByToken = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const token = req.headers.authorization.replace("Bearer ", "");
  
  jwt.verify(token, secret, async (error, decode) => {
    if (error) return res.status(401).send("Token is expired");

    const { userId, isAdmin } = decode;
    const userList = await User.findById(userId).select("-passwordHash -__v");

    if (!userList) return res.status(404).send("User not found");
    res.status(200).send(userList);
  });
};

const getNumberOfUser = async (req, res) => {
  const userCount = await User.estimatedDocumentCount();

  if (!userCount) {
    res.status(404).send("No count for number of user");
  }
  res.status(200).send({ userCount: userCount });
};

const createUser = async (req, res) => {
  const body = req.body;
  const userPassword = req.body.password;

  const newUser = new User({
    ...body,
    passwordHash: bcrypt.hashSync(userPassword, 10),
    creation_time: Date.now(),
  });

  newUser
    .save()
    .then((createdUser) => {
      res.send(createdUser);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const userEditProfile = async (req, res) => {
  const { user_id } = req.params;
  User.findOneAndUpdate({ _id: user_id }, { ...req.body }, { new: true })
    .then((updatedDetails) => {
      res.status(200).send(updatedDetails);
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Update profile failed", error: error.message });
    });
};

const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const userDetails = await User.findOne({ email: email.toLowerCase() });
  const secret = process.env.JWT_SECRET;
  if (!userDetails) return res.status(404).send("User not found");

  try {
    if (await bcrypt.compare(password, userDetails.passwordHash)) {
      const token = jwt.sign(
        { userId: userDetails._id, isAdmin: userDetails.isAdmin },
        secret,
        { expiresIn: "1d" }
      );

      res.send({ email: email, token: token });
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const userLogout = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { last_time_sign_in: Date.now() }
  );
  if (!user) return res.send("Something went wrong");

  res.send("Logout successfully");
};

const userResetPassword = async (req, res) => {
  const { email, old_password, new_password, confirm_password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("Incorrect email");

  const compare = await bcrypt.compare(old_password, user.passwordHash);
  if (!compare) return res.status(401).send("Incorrect old password");

  if (new_password !== confirm_password)
    return res.status(401).send("New and confirm password does not match");

  const updated_password = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { passwordHash: bcrypt.hashSync(new_password, 10) } }
  );

  if (!updated_password) return res.send("Something went wrong");

  res
    .status(200)
    .send({ success: true, message: "The password has successfully changed" });
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  const userAccount = await User.findByIdAndDelete(id);

  if (!userAccount) return res.status(404).send("User not found");
  res
    .status(200)
    .send({ successful: true, message: "Account has been deleted" });
};

module.exports = {
  getAllUser,
  createUser,
  userLogIn,
  getNumberOfUser,
  getUserByToken,
  userResetPassword,
  deleteAccount,
  userLogout,
  userEditProfile,
};
