import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";


const SalesChart = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/orders/totalsales"
        ); // Replace with your API endpoint
        setSalesData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Total Sales", "Total Tax", "Total Shipping"],
    },
  };

  const chartSeries = [
    {
      name: "Amount",
      data: [
        salesData ? salesData.totalSales : 0,
        salesData ? salesData.totalTax : 0,
        salesData ? salesData.totalShipping : 0,
      ],
    },
  ];

  return (
    <div>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              {salesData ? (
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height={350}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
