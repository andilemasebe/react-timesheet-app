import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import CompanyProfile from './company/CompanyProfile';
import Departments from './company/Departments';
import Teams from './company/Teams';
import './Company.css';

const Company = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/company/${tab}`);
  };

  return (
    <div className="company-container">
      <h1>Company Management</h1>
      
      <div className="company-tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => handleTabChange('profile')}
        >
          Company Profile
        </button>
        <button 
          className={activeTab === 'departments' ? 'active' : ''} 
          onClick={() => handleTabChange('departments')}
        >
          Departments
        </button>
        <button 
          className={activeTab === 'teams' ? 'active' : ''} 
          onClick={() => handleTabChange('teams')}
        >
          Teams
        </button>
      </div>
      
      <div className="back-link">
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Company;
