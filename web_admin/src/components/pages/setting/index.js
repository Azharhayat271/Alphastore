import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';

const StoreSettings = () => {
  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                {/* Example Card 1: General Settings */}
                <div className="col-lg-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Logo Setting</h4>
                      <p className="card-description">
                        Configure Logo for your store.
                      </p>
                      {/* Additional content or actions specific to General Settings */}
                      <Link to="/logosetting" className="btn btn-outline-primary btn-fw">
                        Configure
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Example Card 2: Payment Options */}
                <div className="col-lg-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Color Customization</h4>
                      <p className="card-description">
                        Customize the colors for your Store
                      </p>
                      {/* Additional content or actions specific to Payment Options */}
                      <Link to="/colorsetting" className="btn btn-outline-primary btn-fw">
                        Customize Colors
                      </Link>
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

export default StoreSettings;
