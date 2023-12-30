import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import Navbar from "./Navbar";

const InstallmentList = () => {
  const [installments, setInstallments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5002/api/installment/get/658358412a7cea3d5613f676"
        );
        const data = await response.json();

        if (response.ok) {
          console.log("Installments azhsr!", data.installment.installments.isPaid);
          setInstallments(data.installment.installments);

        } else {
          console.error("Error fetching installments:", data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching installments:", error);
        setLoading(false);
      }
    };

    fetchInstallments();
  }, []);

  const setInstallmentAsPaid = async (installmentId) => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/installment/setPaid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            installmentId,
          }),
        }
      );

      if (response.ok) {
        console.log("Installment marked as paid successfully!");
        // You can display a confirmation message to the user
      } else {
        console.error(
          "Failed to set installment as paid:",
          response.statusText
        );
        // Handle status update failure
      }
    } catch (error) {
      console.error("Error setting installment as paid:", error);
      // Handle error
    }
  };

  const handlePayNowClick = (installment) => {
    setSelectedInstallment(installment);
    setIsModalVisible(true);
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      const response = await fetch(
        "http://localhost:5002/api/checkout/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            installmentId: selectedInstallment.id,
            price: selectedInstallment.amount,
            // Add other card details here
          }),
        }
      );

      if (response.ok) {
        console.log("Payment successful!");
        // Set the installment as paid
        await setInstallmentAsPaid(selectedInstallment._id);
        window.location.reload();
        // You can update the UI or take additional actions upon successful payment
      } else {
        console.error("Payment failed:", response.statusText);
        // Handle payment failure
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle payment processing error
    } finally {
      setIsProcessingPayment(false);
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) => (text ? "Paid" : "Pending"),

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handlePayNowClick(record)}
          disabled={record.isPaid}
        >
          {record.isPaid ? "Paid" : "Pay Now"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container">
        {loading ? (
          <p>Loading installments...</p>
        ) : (
          <>
            <Table
              dataSource={installments}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
            {selectedInstallment && (
              <Modal
                title={`Pay Now - $${selectedInstallment.amount}`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                  <Button key="back" onClick={() => setIsModalVisible(false)}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handlePayment}
                    disabled={selectedInstallment.ispaid}
                  >
                    {isProcessingPayment ? "Processing..." : "Confirm Payment"}
                  </Button>,
                ]}
              >
                {/* Add a form or input fields for card details */}
                {/* For simplicity, you can use Ant Design's Input components */}
                {/* Handle form submission in the `handlePayment` function */}
                <Input placeholder="Card Number" />
                <Input placeholder="Expiry Date" />
                <Input placeholder="CVV" />
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstallmentList;
