import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message, Table, Radio } from "antd";
import NavBar from "../components/Navbar";
import { useHistory } from "react-router-dom";

const ReturnDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  // const user = "658358412a7cea3d5613f676";
  const [user, setUserId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    // Fetch user data from local storage
    const userDataString = localStorage.getItem("userPanelInfo");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const firstUserId = userData?.data?.[0]?._id;

      setUserId(firstUserId);
    }
  }, []);

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
      const { installmentPlan } = values;

      // Extracting relevant data from orderDetails
      const products = orderDetails.orderItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image,
      }));

      // Exclude the last two digits from totalPrice
      const truncatedTotalPrice = orderDetails.totalPrice ;

      const requestData = {
        products,
        paymentMethod: orderDetails.paymentMethod,
        totalPrice: truncatedTotalPrice.toString(),
        installmentPlan,
        user
      };

      const response = await fetch(
        "http://localhost:5002/api/installment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (result.success) {
        message.success("Installment plan created successfully");
        history.push("/payments");
        // You may want to redirect or perform other actions after success
      } else {
        message.error("Failed to create installment plan");
      }
    } catch (error) {
      console.error("Error creating installment plan", error);
      message.error("Error creating installment plan");
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
        <h2 style={{ marginBottom: "20px" }}>Installment</h2>
        {orderDetails && (
          <Form
            name="returnForm"
            onFinish={handleReturnSubmit}
            initialValues={{ reason: "", comments: "", installmentPlan: "3" }}
          >
            <Table
              dataSource={orderDetails.orderItems}
              columns={columns}
              rowKey="productId"
              pagination={false}
              style={{ marginBottom: "20px" }}
            />
            <div style={{ marginBottom: "20px" }}>
              <p>Total Bill: {orderDetails.totalPrice}</p>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
            </div>
            <Form.Item name="installmentPlan" label="Select Installment Plan">
              <Radio.Group>
                <Radio value="3">3 Months</Radio>
                <Radio value="6">6 Months</Radio>
                <Radio value="12">1 Year</Radio>
              </Radio.Group>
            </Form.Item>
            {/* Add other form fields as needed */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Installment Plan
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ReturnDetails;
