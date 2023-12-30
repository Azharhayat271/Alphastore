import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import NavBar from "../components/Navbar";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInstallmentPlan, setHasInstallmentPlan] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Fetch user data from local storage
    const userDataString = localStorage.getItem("userPanelInfo");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const firstUserId = userData?.data?.[0]?._id;

      setUserId(firstUserId);

      // Fetch user orders
      if (firstUserId) {
        fetchUserOrders(firstUserId);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch installment plans for the user
    const fetchInstallmentPlans = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/installment/getByUserId/${userId}`
        );

        if (response.status === 404) {
          setHasInstallmentPlan(false);
        } else if (response.ok) {
          setHasInstallmentPlan(true);
        } else {
          console.error("Failed to fetch installment plans");
        }
      } catch (error) {
        console.error("Error fetching installment plans", error);
      }
    };

    if (userId) {
      fetchInstallmentPlans();
    }
  }, [userId]);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/orders/user/${userId}`
      );
      const data = await response.json();

      if (data.success) {
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
        <Button
          type="primary"
          onClick={() => handleViewMore(record)}
          disabled={hasInstallmentPlan}
        >
          Create Installment Plan
        </Button>
      ),
    },
  ];

  const handleViewMore = (order) => {
    history.push(`/order-details/${order._id}`);
  };

  return (
    <div>
      <NavBar />
      {userId && (
        <div className="container" style={{ marginTop: "50px" }}>
          <h2 className="align-center">Installments</h2>
          <Table columns={columns} dataSource={userOrders} loading={loading} rowKey="_id" />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
