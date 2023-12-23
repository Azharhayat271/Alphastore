const Coupon = require("../models/Coupon");
const cron = require("node-cron");

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expiryDate } = req.body;

    const coupon = new Coupon({
      code,
      discountPercentage,
      expiryDate,
    });

    await coupon.save();

    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error getting coupons:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single coupon
exports.getCoupon = async (req, res) => {
  try {
    const { searchString } = req.params;
    const coupon = await Coupon.findOne({
      code: { $eq: searchString },
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.error("Error getting coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a coupon
exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discountPercentage, expiryDate } = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { code, discountPercentage, expiryDate },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon updated successfully" });
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Expired Coupon

const deleteExpiredCoupons = async () => {
  try {
    const currentDate = new Date();
    const expiredCoupons = await Coupon.find({
      expiryDate: { $lte: currentDate },
    });

    if (expiredCoupons.length > 0) {
      const expiredCouponIds = expiredCoupons.map((coupon) => coupon._id);
      await Coupon.deleteMany({ _id: { $in: expiredCouponIds } });
      console.log(`Deleted ${expiredCoupons.length} expired coupon(s).`);
    } else {
      console.log("No expired coupons found.");
    }
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
};
cron.schedule("0 0 * * *", deleteExpiredCoupons);
