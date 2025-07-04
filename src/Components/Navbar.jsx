import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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

  const hamburgerStyle = {
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  return (
    <>
      <nav style={navStyle}>
        <span style={hamburgerStyle} onClick={() => setShowSidebar(true)}>☰</span>
        <div style={linksStyle}>
          <a href="#" style={activeLink}>Home</a>
          <a href="#" style={link}>Profile</a>
          <a href="#" style={link}>Courses</a>
          <a href="#" style={link}>My Doubts</a>
        </div>
      </nav>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </>
  );
};

export default Navbar;
