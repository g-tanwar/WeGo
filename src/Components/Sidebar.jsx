import React from 'react';

const Sidebar = ({ onClose }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  };

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

  const sectionStyle = {
    margin: '1rem 0',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#333',
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
          <h3 style={{ marginBottom: '1.5rem' }}>Gourav Tanwar</h3>
        </div>

        <div style={sectionStyle}>🏅 Top Achievements</div>
        <div style={sectionStyle}>📰 Top News</div>
        <div style={sectionStyle}>🎯 For You</div>
        <div style={sectionStyle}>💳 Your Credits</div>
        <div style={sectionStyle}>🤝 Connections</div>
        <div style={sectionStyle}>📊 Rankings</div>
        <div style={sectionStyle}>⚙️ Settings</div>
        <div style={sectionStyle}>ℹ️ About Us</div>
        <div style={sectionStyle}>📞 Contact Us</div>


      </div>
    </>
  );
};

export default Sidebar;
