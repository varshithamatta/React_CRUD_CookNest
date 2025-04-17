import React from 'react';
import '../styles/AdminDashboard.css';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Select a table from the top menu to manage data.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
