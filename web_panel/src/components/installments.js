import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import NavBar from "../components/Navbar";
import { useHistory } from "react-router-dom"; // Import the useHistory hook


const UserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // Initialize the useHistory hook


  useEffect(() => {
    // Fetch user data from local storage
    const userDataString = localStorage.getItem("userPanelInfo");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Extract user ID from the data
      const firstUserId = userData?.data?.[0]?._id;

      setUserId(firstUserId);

      // Fetch user orders
      if (firstUserId) {
        fetchUserOrders(firstUserId);
      }
    }
  }, []);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/orders/user/${userId}`
      );
      const data = await response.json();

      if (data.success) {
        // Filter orders with payment method "installments"
        const installmentsOrders = data.data.filter(
          (order) => order.paymentMethod === "Installments"
        );

        setUserOrders(installmentsOrders);
      } else {
        console.error("Failed to fetch user orders");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user orders", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "orderItems",
      key: "name",
      render: (orderItems) => orderItems[0].name,
    },
    {
      title: "Image",
      dataIndex: "orderItems",
      key: "image",
      render: (orderItems) => (
        <img
          src={orderItems[0].image}
          alt="Product"
          style={{ maxWidth: "50px" }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (isDelivered ? "Delivered" : "Pending"),
    },
    {
      title: "Delivery Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "View More",
      key: "viewMore",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewMore(record)}>
          View More
        </Button>
      ),
    },
  ];
  const handleViewMore = (order) => {
    // Navigate to the next page with the order ID
    history.push(`/order-details/${order._id}`);
  };
  return (
    <div>
      <NavBar />

      {userId && (
        <div className="container" style={{ marginTop: "50px" }}>
          <h2 className="align-center">Installments</h2>
          <Table
            columns={columns}
            dataSource={userOrders}
            loading={loading}
            rowKey="_id"
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
