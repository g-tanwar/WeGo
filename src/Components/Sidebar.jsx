import React, { useState, useEffect, useRef } from 'react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 👇 Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>

      {sidebarOpen && (
        <div
          ref={sidebarRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '250px',
            background: '#fff',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <p>👤 Profile Pic</p>
          <p>Username</p>
          <hr />
          <p>🏆 Top Achievements</p>
          <p>📰 Top News</p>
          <p>✨ For You</p>
          <p>💰 Your Credits</p>
          <p>⚙️ Settings</p>
          <p>ℹ️ About Us</p>
          <p>📞 Contact Us</p>
        </div>
      )}
    </>
  );
};

export default Sidebar;
