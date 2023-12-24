import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link } from "react-router-dom";

const ReturnList = () => {
  const [returnData, setReturnData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
    },
  ];

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
