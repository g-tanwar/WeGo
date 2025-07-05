import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    margin: '0.8rem 0',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    fontSize: '1rem',
    color: isActive(path) ? '#6a5acd' : '#333',
    borderLeft: isActive(path) ? '4px solid #6a5acd' : '4px solid transparent',
    paddingLeft: '0.5rem',
    cursor: 'pointer',
  });

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100vh',
    backgroundColor: '#fff',
    padding: '1.5rem',
    boxShadow: '2px 0 12px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    overflowY: 'auto',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  };

  const closeBtn = {
    position: 'absolute',
    top: '1rem',
    right: '-2.2rem',
    backgroundColor: '#6a5acd',
    color: '#fff',
    border: 'none',
    fontSize: '1.3rem',
    padding: '0.4rem 0.7rem',
    borderRadius: '50%',
    cursor: 'pointer',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={sidebarStyle}>
        <button style={closeBtn} onClick={onClose}>×</button>
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            style={{ borderRadius: '50%', marginBottom: '0.5rem' }}
          />
          <h3 style={{ marginBottom: '1.2rem' }}>Gourav Tanwar</h3>
        </div>

        <div style={linkStyle('/achievements')} onClick={() => { navigate('/achievements'); onClose(); }}>
          🏅 Top Achievements
        </div>

        <div style={linkStyle('/news')} onClick={() => { navigate('/news'); onClose(); }}>
          📰 Top News
        </div>

        <div style={linkStyle('/foryou')} onClick={() => { navigate('/foryou'); onClose(); }}>
          🎯 For You
        </div>

        <div style={linkStyle('/credits')} onClick={() => { navigate('/credits'); onClose(); }}>
          💳 Your Credits
        </div>

        <div style={linkStyle('/connections')} onClick={() => { navigate('/connections'); onClose(); }}>
          🔗 Connections
        </div>

        <div style={linkStyle('/contact')} onClick={() => { navigate('/contact'); onClose(); }}>
          📞 Contact Us
        </div>

        <div style={linkStyle('/settings')} onClick={() => { navigate('/settings'); onClose(); }}>
          ⚙️ Settings
        </div>

        <div style={linkStyle('/about')} onClick={() => { navigate('/about'); onClose(); }}>
          ℹ️ About Us
        </div>
      </div>
    </>
  );
};

export default Sidebar;
