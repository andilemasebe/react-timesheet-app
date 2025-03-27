import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Company</h2>
          <p>Manage company profile, departments and teams</p>
          <Link to="/company">View Details</Link>
        </div>
        <div className="dashboard-card">
          <h2>Employees</h2>
          <p>Manage employee information</p>
          <Link to="/employees">View Details</Link>
        </div>
        <div className="dashboard-card">
          <h2>Projects</h2>
          <p>Track ongoing and completed projects</p>
          <Link to="/projects">View Details</Link>
        </div>
        <div className="dashboard-card">
          <h2>Timesheets</h2>
          <p>Review and manage time entries</p>
          <Link to="/timesheet">View Details</Link>
        </div>
        <div className="dashboard-card">
          <h2>Training</h2>
          <p>Manage courses and certifications</p>
          <Link to="/training">View Details</Link>
        </div>
        <div className="dashboard-card">
          <h2>Reports</h2>
          <p>Generate and view reports</p>
          <Link to="/reports">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
