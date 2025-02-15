import { Link, Outlet } from "react-router-dom";
import "../css/dashboard.css";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  // const navigate = useNavigate();



  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          {/* <h2>📚 BOOK SELL</h2> */}
          <h2>CRUD📝</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className="active">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/insert">
              <i className="fas fa-plus"></i> Insert
            </Link>
          </li>
          <li>
            <Link to="/admin/display">
              <i className="fas fa-table"></i> Display
            </Link>
          </li>
          <li>
            <Link to="/admin/search">
              <i className="fas fa-search"></i> Search
            </Link>
          </li>
          <li>
            <Link to="/admin/user">
              <i className="fas fa-edit"></i> User
            </Link>
          </li>
          <li>
            <Link to="/admin/order">
              <i className="fas fa-address-book"></i> User Order
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>


          <div className="search-bar">
            <input type="text" placeholder="Search here..." />
          </div>

        </header>
        <main>
          <h1>Welcome to the Dashboard</h1>


          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
