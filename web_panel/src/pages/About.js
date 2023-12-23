import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import NavBar from "../components/Navbar";

const UserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setUserOrders(data.data);
      } else {
        console.error("Failed to fetch user orders");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user orders", error);
      setLoading(false);
    }
  };

  const isOrderDeliveredLastWeek = (deliveryDate) => {
    const deliveryMoment = moment(deliveryDate);
    const oneWeekAgo = moment().subtract(7, "days");
    return deliveryMoment.isAfter(oneWeekAgo);
  };

  const handleReturnButtonClick = (orderId, deliveryDate) => {
    // Check if the order is delivered within the last week
    if (isOrderDeliveredLastWeek(deliveryDate)) {
      window.location.href = `/return-details/${orderId}`;
    } else {
      console.log(
        `Return button is disabled for order ${orderId} as it is not delivered within the last week.`
      );
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleReturnButtonClick(record._id, record.createdAt)}
          disabled={
            !record.isDelivered || !isOrderDeliveredLastWeek(record.createdAt)
          }
        >
          Return
        </Button>
      ),
    },
  ];

  return (
    <div>
      <NavBar />

      {userId && (
        <div className="container" style={{ marginTop: "50px" }}>
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
