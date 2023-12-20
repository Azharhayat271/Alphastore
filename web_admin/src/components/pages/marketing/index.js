import React, { useState, useEffect } from "react";
import { Table }  from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost:5002/api/products/")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("http://localhost:5002/api/users/emails")
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handlePromoteClick = async (productId, productName) => {
    try {
      // Fetch emails from users
      const response = await fetch("http://localhost:5002/api/users/emails");
      const userData = await response.json();

      if (userData.success === 1) {
        const userEmails = userData.data;

        // Send emails about the details of the products
        const sendEmailResponse = await fetch(
          "http://localhost:5002/api/users/sendemail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productDetails: { id: productId, name: productName },
              userEmails,
            }),
          }
        );

        const sendEmailData = await sendEmailResponse.json();

        if (sendEmailData.success === 1) {
          console.log("Emails sent successfully!");
        } else {
          console.error("Failed to send emails");
        }
      } else {
        console.error("Failed to fetch user emails");
      }
    } catch (error) {
      console.error("Error in handlePromoteClick:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Product" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Promote",
      key: "promote",
      render: (text, record) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handlePromoteClick(record._id, record.title)}>
          Promote
        </button>
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
              <Table dataSource={products} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
