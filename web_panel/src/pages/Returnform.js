import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

const ReturnDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details using orderId when the component mounts
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/orders/find/${orderId}`
        );
        const data = await response.json();

        if (data.success) {
          setOrderDetails(data.data);
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleReturnSubmit = async (values) => {
    // Make API request to submit return details
    try {
      const response = await fetch("http://localhost:5002/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          returnDetails: values,
        }),
      });

      const data = await response.json();

      if (data.success) {
        message.success("Return details submitted successfully");
        // You can redirect or perform any other action upon successful submission
      } else {
        message.error("Failed to submit return details");
      }
    } catch (error) {
      console.error("Error submitting return details", error);
      message.error("Error submitting return details");
    }
  };

  return (
    <div>
      <h2>Return Details for Order</h2>
      {orderDetails && (
        <Form
          name="returnForm"
          onFinish={handleReturnSubmit}
          initialValues={{ reason: "", comments: "" }}
        >
          <Form.Item>
            <img
              src={orderDetails.orderItems[0].image}
              alt="Product"
              style={{ maxWidth: "100px" }}
            />
          </Form.Item>
          <Form.Item label="Product Name">
            {orderDetails.orderItems[0].name}
          </Form.Item>
          <Form.Item label="Total Price">{orderDetails.totalPrice}</Form.Item>
          <Form.Item
            label="Return Reason"
            name="reason"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Additional Comments" name="comments">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Return
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ReturnDetails;
