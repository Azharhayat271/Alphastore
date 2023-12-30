import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";

const PendingPaymentsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume you have an API endpoint that fetches the pending payments data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5002/api/installment/getTotalPendingPayments"
        ); // Adjust the API endpoint as needed
        const result = await response.json();

        if (result.success) {
          setData(result.totalPendingPayments);
        } else {
          console.error("Error fetching pending payments:", result.message);
        }
      } catch (error) {
        console.error("Error fetching pending payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  const columns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Payment ID", dataIndex: "paymentId", key: "paymentId" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
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
                dataSource={data}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 10 }} // Adjust the pageSize as needed
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingPaymentsTable;
