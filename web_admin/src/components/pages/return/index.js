import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link } from "react-router-dom";
import { message } from "antd";

const ReturnList = () => {
  const [returnData, setReturnData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
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
        <span>{orderItems.map((item) => item.name).join(", ")}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleViewDetails(record)}>View More</Button>
          <Button onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      // Assuming you have an endpoint for deleting a return record
      const response = await fetch(
        `http://localhost:5002/api/return/delete/${record.orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as needed
          },
        }
      );

      if (response.ok) {
        message.success("Return record deleted successfully");
        // Successful deletion, update the UI accordingly (e.g., refetch data)
        const updatedReturnData = returnData.filter(
          (item) => item.returnId !== record.returnId
        );
        setReturnData(updatedReturnData);
      } else {
        console.error("Error deleting return record:", response.statusText);
        // Add a notification or display an error message to the user
      }
    } catch (error) {
      console.error("Error deleting return record:", error);
      // Add a notification or display an error message to the user
    }
  };

  const handleViewDetails = (record) => {
    setSelectedReturn(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReturn(null);
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

              <Modal
                title="Return Details"
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
              >
                {selectedReturn && (
                  <div>
                    <p>Order ID: {selectedReturn.orderId}</p>
                    <p>Reason: {selectedReturn.reason}</p>
                    <p>Comments: {selectedReturn.comments}</p>
                    <p>
                      Order Items:
                      <ul>
                        {selectedReturn.orderItems.map((item) => (
                          <li key={item.id}>
                            Name: {item.name}, Price: {item.price}, Quantity:{" "}
                            {item.qty}
                          </li>
                        ))}
                      </ul>
                    </p>
                    {/* Add more details as needed */}
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnList;
