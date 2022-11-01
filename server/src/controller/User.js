const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  const userList = await User.find();
  
  if (!userList) return res.status(500).json({ success: false, message: "No users found." });
  res.status(200).send(userList);
};

const getUserByToken = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const token = req.headers.authorization.replace("Bearer ", "");
  const { userId, isAdmin, error } =
    jwt.verify(token, secret, (error, decoded) => {
      if (error?.name) {
        res.status(404).send("Token is expired.");
        return;
      }
      return decoded;
    }) || { error: "jwt expired" }; // solve to error if destructuring the property is undefined
  
  if(error === "jwt expired") return;
  if (!userId) return res.status(404).send("User ID not found.");

  const userList = await User.findById(userId);
  res.status(200).send(userList);
};

const getNumberOfUser = async (req, res) => {
  const userCount = await User.estimatedDocumentCount();

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
};

const createUser = async (req, res) => {
  const body = req.body;
  const userPassword = req.body.password;

  const newUser = new User({
    ...body,
    passwordHash: bcrypt.hashSync(userPassword, 10),
    creation_time: Date.now()
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

const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const userDetails = await User.findOne({ email });
  const secret = process.env.JWT_SECRET;

  if(!userDetails) return res.status(404).json({ success: false, message: "user not found."});

  try {
    if(await bcrypt.compare(password, userDetails.passwordHash)){
      const token = jwt.sign(
        { userId: userDetails._id, isAdmin: userDetails.isAdmin },
        secret,
        { expiresIn: "1d"}
      );

      res.status(200).send({ email: email, token: token})

    } else {
      res.status(500).send("Invalid email or password.");
    }
  } catch (error) {
    res.status(500).json({ success: false, error});
  }
}

const userResetPassword = async (req, res) => {
  const { email, old_password, new_password, confirm_password} = req.body;

  const user = await User.findOne({ email });
  if(!user) return res.status(500).send("Incorrect email.");

  const compare = await bcrypt.compare(old_password, user.passwordHash);
  if(!compare) return res.status(500).send("Incorrect old password");

  if(new_password !== confirm_password) return res.status(500).send("New and confirm password does not match.");

  const updated_password = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { passwordHash: bcrypt.hashSync(new_password, 10) } }
  );
  
  if(!updated_password) return res.status(500).send("Something went wrong.");

  res.status(200).json({ success: true, message: "The password has successfully changed."});
}

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  
  const userAccount = await User.findByIdAndDelete(id);

  if(!userAccount) return res.status(404).json("User not found.");
  res.status(200).json({ successful: true, message: "Account has been deleted."  });
}

module.exports = {
  getAllUser,
  createUser,
  userLogIn,
  getNumberOfUser,
  getUserByToken,
  userResetPassword,
  deleteAccount,
};
