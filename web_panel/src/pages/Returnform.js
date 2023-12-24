import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message, Table } from "antd";
import NavBar from "../components/Navbar";

const ReturnDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
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
    try {
      const response = await fetch("http://localhost:5002/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          returnDetails: {
            orderItems: orderDetails.orderItems,
            additionalData: values, // You can add any other data you need
          },
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

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={text}
          alt="Product"
          style={{ maxWidth: "50px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2 style={{ marginBottom: "20px" }}>Return Details for Order</h2>
        {orderDetails && (
          <Form
            name="returnForm"
            onFinish={handleReturnSubmit}
            initialValues={{ reason: "", comments: "" }}
          >
            <Table
              dataSource={orderDetails.orderItems}
              columns={columns}
              rowKey="productId"
              pagination={false}
              style={{ marginBottom: "20px" }}
            />
            <div style={{ marginBottom: "20px" }}>
              <Form.Item
                label="Reasons"
                name="reason"
                rules={[
                  { required: true, message: "Please provide a return reason" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Form.Item label="Comment" name="comments">
                <Input.TextArea />
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Return
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ReturnDetails;
