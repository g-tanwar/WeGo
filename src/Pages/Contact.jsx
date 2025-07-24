import React from 'react';
import Navbar from '../Components/Navbar.jsx';

const contactOptions = [
  {
    icon: '✉️',
    title: 'Email Us',
    description: 'support@wego.com',
  },
  {
    icon: '📞',
    title: 'Call Us',
    description: '9034673143',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    description: 'Chat with our support team for instant help.',
  },
  {
    icon: '📍',
    title: 'Visit Us',
    description: 'Rishihood University, Sonipat, Haryana',
  },
];

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  padding: '24px',
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  opacity: 0,
  transform: 'translateY(40px)',
  animation: 'fadeInUp 0.7s forwards',
};

const Contact = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>📞 Contact Us</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {contactOptions.map((option, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{option.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{option.title}</div>
              <div style={{ color: '#555', fontSize: 16, marginTop: 6 }}>{option.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contact;
