import React from 'react';
import Navbar from './Navbar.jsx';

const Profile = () => {
  const pageStyle = {
    padding: '2rem',
    background: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  };

  const progressContainer = {
    background: '#eee',
    borderRadius: '10px',
    height: '20px',
    width: '100%',
    overflow: 'hidden',
    marginTop: '0.5rem',
  };

  const progressBar = (value) => ({
    height: '100%',
    width: `${value}%`,
    backgroundColor: '#6a5acd',
  });

  return (
    <>
        <Navbar />
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2>👨‍🎓 Gourav Tanwar</h2>
          <p>📧 gourav@example.com</p>
          <p>🎖️ Silver Rank | 🎯 Credits: 560</p>
        </div>
        <div style={cardStyle}>
          <h3>📈 Progress</h3>
          <p>React - 40%</p>
          <div style={progressContainer}><div style={progressBar(40)}></div></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
