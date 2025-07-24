import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';

const settingsOptions = [
  {
    icon: '👤',
    title: 'Profile Settings',
    description: 'Update your name, email, and profile picture.',
  },
  {
    icon: '🔒',
    title: 'Privacy',
    description: 'Manage your privacy and security preferences.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    description: 'Switch between light and dark themes.',
  },
  {
    icon: '🔔',
    title: 'Notifications',
    description: 'Control your notification settings.',
  },
];

const cardStyle = (dark) => ({
  background: dark ? '#23272f' : '#fff',
  color: dark ? '#f3f4f6' : '#222',
  borderRadius: '16px',
  boxShadow: dark ? '0 4px 16px rgba(0,0,0,0.32)' : '0 4px 16px rgba(0,0,0,0.08)',
  padding: '24px',
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  opacity: 0,
  transform: 'translateY(40px)',
  animation: 'fadeInUp 0.7s forwards',
});

const Setting = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('wego-dark-mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('wego-dark');
    } else {
      document.body.classList.remove('wego-dark');
    }
    localStorage.setItem('wego-dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>⚙️ Settings</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          body.wego-dark {
            background: #181a20 !important;
            color: #f3f4f6 !important;
          }
        `}</style>
        {settingsOptions.map((option, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle(darkMode),
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{option.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{option.title}</div>
              <div style={{ color: darkMode ? '#bbb' : '#555', fontSize: 16, marginTop: 6 }}>{option.description}</div>
            </div>
            {option.title === 'Dark Mode' && (
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((d) => !d)}
                  style={{ width: 24, height: 24, accentColor: '#6366f1', marginRight: 8 }}
                />
                <span style={{ fontWeight: 500 }}>{darkMode ? 'On' : 'Off'}</span>
              </label>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Setting;
