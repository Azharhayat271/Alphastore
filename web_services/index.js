const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const Colorsetting = require("./routes/color");
const Logo = require("./routes/logo");
const couponRoutes = require("./routes/coupon");
const returnRoutes = require('./routes/return');


// Read value from .env file
dotenv.config();

//MongoDB Connection
mongoose
  .connect(process.env.DB_URL_DEVELOPMENT, {
    family: 4,
  })
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Allow to call from different source
//alphastore-8s3q.vercel.app

app.use(cors());
// parse requests of content-type - application/json, Read JSON data from request
app.use(express.json());

//Use routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/color", Colorsetting);
app.use("/api/logo", Logo);
app.use("/api", couponRoutes);
app.use('/api/return', returnRoutes);


//Read PORT from .env file OR Default set 5002
const API_PORT = process.env.API_PORT || 5005;

const server = app.listen(API_PORT, () => {
  console.log(`Backend Server is running on port ${API_PORT}`);
});
module.exports = server;
