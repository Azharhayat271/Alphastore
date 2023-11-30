import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { Layout, Row, Col, Card, Input, Button } from 'antd';

const ColorCustomization = () => {
    const [headerColor, setHeaderColor] = useState('#3498db'); // Default color for the header
    const [bodyColor, setBodyColor] = useState('#ecf0f1'); // Default color for the body

    const handleHeaderColorChange = (e) => {
        setHeaderColor(e.target.value);
    };

    const handleBodyColorChange = (e) => {
        setBodyColor(e.target.value);
    };

    const handleSaveColors = () => {
        // Make an API request to save the colors to the backend
        axios.put('http://localhost:5002/api/color/updatecolors/65678139818cc3aee5b934f2', { headerColor, bodyColor })
            .then((response) => {
                console.log('Colors saved successfully:', response.data);
                // You can add further logic or UI updates here if needed
            })
            .catch((error) => {
                console.error('Error saving colors:', error);
                // Handle errors or show a notification to the user
            });
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
                                {/* Color Customization Card (Full Width) */}
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Color Customization</h4>
                                            <p className="card-description">
                                                Customize the colors for your store.
                                            </p>
                                            {/* Color Inputs */}
                                            <div>
                                                <label htmlFor="headerColor">Header Color:</label>
                                                <Input
                                                    type="color"
                                                    id="headerColor"
                                                    value={headerColor}
                                                    onChange={handleHeaderColorChange}
                                                />

                                            </div>
                                            <div>
                                                <label htmlFor="bodyColor">Body Color:</label>
                                                <Input
                                                    type="color"
                                                    id="bodyColor"
                                                    value={bodyColor}
                                                    onChange={handleBodyColorChange}
                                                />
                                            </div>
                                            <br></br>

                                            {/* Save Button */}
                                            <button onClick={handleSaveColors} className="btn btn-outline-primary btn-fw">
                                                Save Colors
                                            </button>
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

export default ColorCustomization;
