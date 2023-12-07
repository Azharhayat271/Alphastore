import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import axios from 'axios'; // Import axios for API requests

const LogoUploader = () => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoId,setLogoId]=useState(null);

  // Fetch logo URL from the database when the component is rendered
  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/logo/first'); // Update the endpoint as needed
        const logos = response.data.logo.logoUrl;

        setLogoId( response.data.logo._id)
        setLogoUrl(logos); // Assuming you only have one logo, adjust if needed

      } catch (error) {
        console.error('Error fetching logo URL:', error);
      }
    };

    fetchLogoUrl();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const onFinish = async (values) => {
    try {
      const base="http://localhost:5002/api/logo/update/";
      const Path= base +logoId;
      // Make PUT request to update the logo URL in the database
      const response = await axios.put(Path, { logoUrl: values.logoUrl });

      if (response.status === 200) {
        message.success('Logo URL updated successfully!');
      } else {
        message.error('Error updating logo URL.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while updating the logo URL.');
    }
  };

  const handlePreview = () => {
    setLogoUrl(form.getFieldValue('logoUrl'));
  };

  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Logo Uploader</h4>
                      <Form form={form} onFinish={onFinish}>
                        <Form.Item name="logoUrl" label="Logo URL" rules={[{ required: true, message: 'Please enter a logo URL!' }]}>
                          <Input />
                        </Form.Item>

                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Save Logo URL
                          </Button>
                          <Button style={{ marginLeft: '10px' }} onClick={handlePreview} icon={<EyeOutlined />}>
                            Preview
                          </Button>
                        </Form.Item>
                      </Form>

                      {logoUrl && (
                        <Card title="Logo Preview" style={{ marginTop: '20px' }}>
                          <img src={logoUrl} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoUploader;
