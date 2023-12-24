import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showCart } from "../redux/actions/cartActions";
import { Input, Button, Typography, message } from "antd";

const { Text } = Typography;

const CartTotal = () => {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
    setError("");
  };

  const applyCoupon = async () => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/coupons/${couponCode}`
      );
      const data = await response.json();
      if (response.ok) {
        setDiscountPercentage(data.discountPercentage);
      } else {
        setDiscountPercentage(0);
        setError("Coupon not found");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Error applying coupon");
    }
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartTotal = cartItems
    .reduce((a, i) => a + i.qty * i.price, 0)
    .toFixed(2);
  const totalAfterDiscount = cartTotal - (cartTotal * discountPercentage) / 100;

  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(showCart(false));
  };

  return (
    <>
      <footer>
        <h3 className="cart-total text-slanted">
          total : ${totalAfterDiscount}
        </h3>
        <div>
          <Input.Search
            value={couponCode}
            onChange={handleCouponCodeChange}
            placeholder="Enter coupon code"
            enterButton={
              <Button
                type="primary"
                onClick={applyCoupon}
                style={{ backgroundColor: "green" }}
              >
                Apply
              </Button>
            }
            onSearch={applyCoupon}
          />
        </div>
        {error && <Text type="danger">{error}</Text>}
        {cartItems.length > 0 ? (
          <Link to="/shipping" onClick={closeCart}>
            <Button className="cart-checkout mt-5" type="primary">
              Checkout
            </Button>
          </Link>
        ) : (
          ""
        )}
      </footer>
    </>
  );
};

export default CartTotal;
