import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import StatsGraphs from './StatsGraphs.jsx';
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();

  const containerStyle = {
    padding: '2rem',
    background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
    minHeight: 'calc(100vh - 60px)',
    animation: 'fadeIn 1s ease-in-out',
  };

  const boxStyle = {
    backgroundColor: '#ffffffdd',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '800px',
    margin: '2rem auto',
    textAlign: 'center',
    animation: 'slideUp 1s ease',
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const cardStyle = {
    backgroundColor: '#bbdefb',
    padding: '1.5rem',
    borderRadius: '10px',
    flex: '1 1 250px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const testimonialSectionStyle = {
    marginTop: '4rem',
    padding: '2rem',
    backgroundColor: '#f0f8ff',
    borderRadius: '20px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  };

  const testimonialCardStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '15px',
    width: '280px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
    flex: '1 1 250px'
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      
      <div style={containerStyle}>
        <div style={boxStyle}>
          <h1 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>
            Welcome to <span style={{ fontWeight: 'bold' }}>WeGo</span> ✨
          </h1>
          <p style={{ color: '#333' }}>A better way to learn, ask, and grow — together. 🚀</p>

          <div style={sectionStyle}>
            <div
              style={cardStyle}
              onClick={() => navigate('/courses')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3>📚 Learn</h3>
              <p>Watch lessons from peers in your class.</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate('/doubts')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3>💬 Ask Doubts</h3>
              <p>Post doubts, get help, become stronger.</p>
            </div>

            <div
              style={cardStyle}
              onClick={() => navigate('/rankings')}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3>🏆 Earn Credits</h3>
              <p>Teach & get ranked in our leaderboard!</p>
            </div>
          </div>
        </div>

        {/* ✅ Testimonials Section */}
        <div style={testimonialSectionStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>💬 What Our Students Say</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            <div style={testimonialCardStyle}>
              <p>"WeGo helped me master React and crack my internship interview!"</p>
              <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>— Priya Sharma</p>
            </div>

            <div style={testimonialCardStyle}>
              <p>"Thanks to WeGo I cleared DSA rounds with confidence!"</p>
              <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>— Sahil Verma</p>
            </div>

            <div style={testimonialCardStyle}>
              <p>"Loved the peer-to-peer doubt solving, better than YouTube!"</p>
              <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>— Anjali Mehta</p>
            </div>
          </div>
        </div>
        <StatsGraphs />
      </div>

    </>
  );
};

export default Home;
