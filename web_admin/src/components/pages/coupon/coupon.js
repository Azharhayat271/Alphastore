import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Space, Card } from "antd";
import moment from "moment";
import Header from "../../Header";
import Sidebar from "../../Sidebar";

const AdminPage = () => {
  const [form] = Form.useForm();
  const [coupons, setCoupons] = useState([]);
  const [editCouponId, setEditCouponId] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/coupons");
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { code, discountPercentage, expiryDate } = values;

      if (editCouponId) {
        // Update existing coupon
        const response = await fetch(
          `http://localhost:5002/api/coupons/${editCouponId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              discountPercentage,
              expiryDate,
            }),
          }
        );

        if (response.ok) {
          const updatedCoupon = await response.json();
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon._id === updatedCoupon._id ? updatedCoupon : coupon
            )
          );
          form.resetFields();
          setEditCouponId(null);
          await fetchCoupons();
        } else {
          console.error("Error updating coupon:", response.statusText);
        }
      } else {
        // Create new coupon
        const couponData = { code, discountPercentage, expiryDate };
        const response = await fetch("http://localhost:5002/api/coupons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(couponData),
        });

        if (response.ok) {
          const newCoupon = await response.json();
          setCoupons([...coupons, newCoupon]);
          form.resetFields();
          await fetchCoupons();
        } else {
          console.error("Error creating coupon:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditCoupon = (coupon) => {
    form.setFieldsValue(coupon);
    setEditCouponId(coupon._id);
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/coupons/${couponId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
        if (editCouponId === couponId) {
          form.resetFields();
          setEditCouponId(null);
        }
      } else {
        console.error("Error deleting coupon:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const validateDateFormat = (_, value) => {
    if (value && !moment(value, "YYYY-MM-DD", true).isValid()) {
      return Promise.reject(
        "Invalid date format. Please use the format YYYY-MM-DD"
      );
    }
    return Promise.resolve();
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => moment(expiryDate).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditCoupon(record)}>Edit</Button>
          <Button danger onClick={() => handleDeleteCoupon(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />

        <div className="content-wrapper">
          <Card className="mb-5">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              form={form}
              onFinish={handleFormSubmit}
            >
              <h2 className="mb-4">
                {editCouponId ? "Edit Coupon" : "Create Coupon"}
              </h2>
              <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: "Please enter the code" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Discount Percentage"
                name="discountPercentage"
                rules={[
                  {
                    required: true,
                    message: "Please enter the discount percentage",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                  { required: true, message: "Please enter the expiry date" },
                  { validator: validateDateFormat },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  {editCouponId ? "Update Coupon" : "Create Coupon"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <h2 className="mb-3">Coupons</h2>
          <Table dataSource={coupons} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
