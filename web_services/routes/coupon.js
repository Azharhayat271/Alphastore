const express = require("express");
const router = express.Router();
const couponController = require("../controller/CouponController");

// Create a new coupon
router.post("/coupons", couponController.createCoupon);

// Get all coupons
router.get("/coupons", couponController.getAllCoupons);

// Get a single coupon
router.get("/coupons/:searchString", couponController.getCoupon);

// Update a coupon
router.put("/coupons/:id", couponController.updateCoupon);

// Delete a coupon
router.delete("/coupons/:id", couponController.deleteCoupon);

// Delete a expire coupon

module.exports = router;
