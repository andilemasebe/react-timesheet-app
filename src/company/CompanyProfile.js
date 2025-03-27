import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch company profile data
    // This would typically come from your backend
    setCompanyData({
      name: 'Example Company',
      address: '123 Business St, City, State',
      phone: '(555) 123-4567',
      email: 'contact@example.com',
      website: 'www.example.com',
      description: 'A leading provider of timesheet solutions'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update company profile
    setTimeout(() => {
      setMessage('Company profile updated successfully!');
      setIsEditing(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="company-profile-container">
      <h2>Company Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-field">
            <strong>Company Name:</strong> {companyData.name}
          </div>
          <div className="profile-field">
            <strong>Address:</strong> {companyData.address}
          </div>
          <div className="profile-field">
            <strong>Phone:</strong> {companyData.phone}
          </div>
          <div className="profile-field">
            <strong>Email:</strong> {companyData.email}
          </div>
          <div className="profile-field">
            <strong>Website:</strong> {companyData.website}
          </div>
          <div className="profile-field">
            <strong>Description:</strong> {companyData.description}
          </div>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={companyData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={companyData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={companyData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={companyData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={companyData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={companyData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CompanyProfile;
