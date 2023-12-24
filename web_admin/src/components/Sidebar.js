import { Link } from "react-router-dom";

//fuction to handle handleClick
const handleClick = () => {
  localStorage.removeItem("userInfo");
  window.location.href = "/login";
};

const Sidebar = () => {
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fa fa-home menu-icon" aria-hidden="true"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              <i className="fa fa-cube menu-icon" />
              <span className="menu-title">Products</span>
            </Link>
          </li>
          {/* <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  <i className="fa fa-list menu-icon" />
                  <span className="menu-title">Categories</span>
                </Link>
              </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/orders">
              <i className="fa fa-shopping-cart menu-icon" />
              <span className="menu-title">Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <i className="fa fa-user menu-icon" />
              <span className="menu-title">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/return">
              <i className="fa fa-retweet menu-icon" />
              <span className="menu-title">Product Return</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/storesetting">
              <i className="fa fa-cogs menu-icon" />
              <span className="menu-title">Store Setting</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/marketing">
              <i class="fa fa-list menu-icon"></i>
              <span className="menu-title">Marketing</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/coupons">
              <i class="fa fa-codepen menu-icon"></i>
              <span className="menu-title">Coupon</span>
            </Link>
          </li>
          <li className="nav-item" onClick={handleClick}>
            <Link className="nav-link">
              <i className="fa fa-sign-out menu-icon" onClick={handleClick} />
              <span className="menu-title">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
