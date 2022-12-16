const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());
app.use(morgan("tiny"));

const API = process.env.API_URL;
const PORT = process.env.PORT || 5000;

const product = require("./src/route/Product");
const category = require("./src/route/Category");
const user = require("./src/route/User");
const like = require("./src/route/Wishlist");
const review = require("./src/route/Review");
const cart = require("./src/route/Cart");
const order = require("./src/route/Order");
const address = require("./src/route/UserAddress");
const checkout = require("./src/route/Checkout");

// for testing
app.get(`${API}/hello`, (req, res) => {
  res.send("Hello world");
});


// routes
app.use(`${API}/products`, product);
app.use(`${API}/categories`, category);
app.use(`${API}/users`, user);
app.use(`${API}/likes`, like);
app.use(`${API}/review`, review);
app.use(`${API}/cart`, cart);
app.use(`${API}/order`, order);
app.use(`${API}/user-address`, address);
app.use(`${API}/stripe`, checkout);

// database
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "RNative-e-commerce-database"
})
.then(() => {
  console.log("Database is ready!");
  app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
  });
})