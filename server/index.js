const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));

const baseURL = process.env.API_URL;
const PORT = process.env.PORT || 5000;

app.get(`${baseURL}/hello`, (req, res) => {
  res.send("Hello world");
});

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