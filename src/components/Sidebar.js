import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect will happen automatically due to auth state change
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>TimeTrack</h2>
        <button className="close-sidebar" onClick={toggleSidebar}>
          ×
        </button>
      </div>
      
      {user && (
        <div className="user-info">
          <div className="user-avatar">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p>{user.displayName || user.email}</p>
            <small>{user.email}</small>
          </div>
        </div>
      )}
      
      <nav className="sidebar-nav">
        <ul>
          <li className={isActive('/dashboard')}>
            <Link to="/dashboard">
              <i className="icon dashboard-icon"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/company') || isActive('/company/profile') || isActive('/company/departments') || isActive('/company/teams')}>
            <Link to="/company">
              <i className="icon company-icon"></i>
              <span>Company</span>
            </Link>
          </li>
          <li className={isActive('/employees')}>
            <Link to="/employees">
              <i className="icon employees-icon"></i>
              <span>Employees</span>
            </Link>
          </li>
          <li className={isActive('/projects')}>
            <Link to="/projects">
              <i className="icon projects-icon"></i>
              <span>Projects</span>
            </Link>
          </li>
          <li className={isActive('/timesheet')}>
            <Link to="/timesheet">
              <i className="icon timesheet-icon"></i>
              <span>Timesheets</span>
            </Link>
          </li>
          <li className={isActive('/training') || isActive('/training/courses') || isActive('/training/certifications')}>
            <Link to="/training">
              <i className="icon training-icon"></i>
              <span>Training</span>
            </Link>
          </li>
          <li className={isActive('/reports')}>
            <Link to="/reports">
              <i className="icon reports-icon"></i>
              <span>Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <i className="icon logout-icon"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
