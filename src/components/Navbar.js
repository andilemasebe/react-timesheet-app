import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    
    // Simulate fetching notifications
    setNotifications([
      { id: 1, message: 'Your timesheet for last week is pending approval', time: '2 hours ago', read: false },
      { id: 2, message: 'New project "Website Redesign" has been assigned to you', time: '1 day ago', read: false },
      { id: 3, message: 'Team meeting scheduled for tomorrow at 10:00 AM', time: '2 days ago', read: true }
    ]);
    
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect will happen automatically due to auth state change
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setDropdownOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="TimeTrack Logo" className="navbar-logo" />
          <span>TimeTrack</span>
        </Link>
      </div>
      
      <div className="navbar-right">
        {user && (
          <>
            <div className="notifications-container">
              <button 
                className="notifications-button" 
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <i className="icon notification-icon"></i>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="mark-read-button">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="notifications-list">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        >
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="user-dropdown-container">
              <button 
                className="user-dropdown-button" 
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.displayName || user.email.split('@')[0]}</span>
              </button>
              
              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    <i className="icon profile-icon"></i>
                    <span>Profile</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="icon settings-icon"></i>
                    <span>Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <i className="icon logout-icon"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        
        {!user && (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="register-button">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
