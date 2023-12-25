import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ReturnList = () => {
  const [returnData, setReturnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReturn, setSelectedReturn] = useState(null);


  useEffect(() => {
    // Fetch return data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/return/all");
        const data = await response.json();
        setReturnData(data.returns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching return data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Order Items",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => (
        // Modify this according to how you want to render the order items
        <span>{orderItems.map((item) => item.name).join(", ")}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleViewDetails(record._id)}>View More</Button>
      ),
    },
  ];
  const handleViewDetails = async (returnId) => {
    try {
      const response = await fetch(`http://localhost:5002/api/return/${returnId}`);
      const details = await response.json();
      // Handle the details as needed, e.g., show a modal with the details
      console.log("Return Details:", details);
      setSelectedReturn(details);
    } catch (error) {
      console.error("Error fetching return details:", error);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Table
                dataSource={returnData}
                columns={columns}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnList;
