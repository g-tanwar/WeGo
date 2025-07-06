import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, toggleSidebar, isSidebarOpen }) => {
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ paddingTop: '4rem' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
