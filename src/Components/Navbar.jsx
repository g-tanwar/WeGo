import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const linkStyle = (path) => ({
    margin: '0 1rem',
    cursor: 'pointer',
    textDecoration: location.pathname === path ? 'underline' : 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <>
      <div style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleSidebar} style={{ fontSize: '1.5rem', background: 'none', border: 'none' }}>☰</button>
          <h2 style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>WeGo</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={linkStyle('/profile')} onClick={() => navigate('/profile')}>Profile</div>
          <div style={linkStyle('/courses')} onClick={() => navigate('/courses')}>Courses</div>
          <div style={linkStyle('/rankings')} onClick={() => navigate('/rankings')}>Rankings</div>
          <div style={linkStyle('/doubts')} onClick={() => navigate('/doubts')}>My Doubts</div>
        </div>
      </div>
    
      {sidebarOpen && (
        <div
          ref={sidebarRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '260px',
            backgroundColor: '#fff',
            boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
            padding: '1.5rem',
            zIndex: 1100,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img
              src="https://via.placeholder.com/80"
              alt="profile"
              style={{ borderRadius: '50%' }}
            />
            <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>@StudentUser</p>
          </div>
          <hr />
          <p onClick={() => navigate('/achievements')} style={{ margin: '1rem 0', cursor: 'pointer' }}>🏆 Top Achievements</p>
          <p onClick={() => navigate('/news')} style={{ margin: '1rem 0', cursor: 'pointer' }}>📰 Top News</p>
          <p onClick={() => navigate('/foryou')} style={{ margin: '1rem 0', cursor: 'pointer' }}>✨ For You</p>
          <p onClick={() => navigate('/credits')} style={{ margin: '1rem 0', cursor: 'pointer' }}>💰 Your Credits</p>
          <p onClick={() => navigate('/setting')} style={{ margin: '1rem 0', cursor: 'pointer' }}>⚙️ Settings</p>
          <p onClick={() => navigate('/about')} style={{ margin: '1rem 0', cursor: 'pointer' }}>ℹ️ About Us</p>
          <p onClick={() => navigate('/contact')} style={{ margin: '1rem 0', cursor: 'pointer' }}>📞 Contact Us</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
