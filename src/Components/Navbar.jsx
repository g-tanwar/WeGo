import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#6a5acd',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const linksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const link = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
  };

  const activeLink = {
    ...link,
    borderBottom: '2px solid white',
    paddingBottom: '0.3rem',
  };

  return (
    <>
      <nav style={navStyle}>
        <span style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setShowSidebar(true)}>☰</span>
        <div style={linksStyle}>
          <Link to="/home" style={location.pathname === '/home' ? activeLink : link}>Home</Link>
          <Link to="/profile" style={location.pathname === '/profile' ? activeLink : link}>Profile</Link>
          <Link to="/courses" style={location.pathname === '/courses' ? activeLink : link}>Courses</Link>
          <Link to="/rankings" style={location.pathname === '/rankings' ? activeLink : link}>Rankings</Link>
          <Link to="/doubts" style={location.pathname === '/doubts' ? activeLink : link}>My Doubts</Link>
        </div>
      </nav>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </>
  );
};

export default Navbar;
