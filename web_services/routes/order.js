const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const generateInvoice = require("../controller/InvoiceController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Create Order
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      status: 1,
      message: "Order submitted successfully",
      data: savedOrder,
      orderId: savedOrder._id, // Include the order ID in the response
    });
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// Generate Invoice PDF and provide it as a download
router.get("/invoice/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      // Generate the invoice and send it as a response
      generateInvoice(order, res);
    } else {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});
// Update Order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (updatedOrder == null) {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    } else {
      res.status(200).json({
        success: 1,
        message: "Order updated successfully",
        data: [updatedOrder],
      });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

//Get All Orders
router.get("/all", async (req, res) => {
  try {
    let sortObject = {};
    let sortByField = "createdAt";

    sortObject[sortByField] = -1; //Sort Order

    const orderData = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $project: {
          "user_info._id": 0,
          "user_info.password": 0,
          "user_info.createdAt": 0,
          "user_info.updatedAt": 0,
          "user_info.isAdmin": 0,
        },
      },
    ]).sort(sortObject);

    if (orderData) {
      res.status(200).json({ success: 1, message: "", data: orderData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

//Get Single Order
router.get("/find/:id", async (req, res) => {
  try {
    const orderData = await Order.findById(req.params.id);

    if (orderData) {
      res.status(200).json({ success: 1, message: "", data: orderData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// Update Order to Delivered
router.put("/delivered/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isDelivered: true, deliveredAt: Date.now() },
      },
      { new: true }
    );

    if (updatedOrder == null) {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    } else {
      res.status(200).json({
        success: 1,
        message: "Order delivered successfully",
        data: [updatedOrder],
      });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// Delete Order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (deletedOrder == null) {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    } else {
      res
        .status(200)
        .json({ success: 1, message: "Order deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// api to get the order on the base of user id
router.get("/user/:id", async (req, res) => {
  try {
    const orderData = await Order.find({ user: req.params.id });

    if (orderData) {
      res.status(200).json({ success: 1, message: "", data: orderData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// get api which will return the the total itemsPrice, taxPrice, and shipping price of all the orders
router.get("/totalsales", async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
          totalTax: { $sum: "$taxPrice" },
          totalShipping: { $sum: "$shippingPrice" },
        },
      },
    ]);

    if (totalSales.length > 0) {
      // Since totalSales is an array, check if it has any elements before responding
      res.status(200).json({ success: 1, message: "", data: totalSales[0] });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

module.exports = router;
