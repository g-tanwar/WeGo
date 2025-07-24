import React from 'react';
import Navbar from '../Components/Navbar.jsx';

const aboutInfo = [
  {
    icon: '🚀',
    title: 'Our Mission',
    description: 'Empowering students to learn, grow, and succeed with innovative tools and a supportive community.',
  },
  {
    icon: '👥',
    title: 'Our Team',
    description: 'A passionate group of educators, developers, and mentors dedicated to your success.',
  },
  {
    icon: '📈',
    title: 'Our Story',
    description: 'Started as a small project, WeGo is now a thriving platform for learners everywhere.',
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

const About = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>ℹ️ About Us</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {aboutInfo.map((info, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{info.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{info.title}</div>
              <div style={{ color: '#555', fontSize: 16, marginTop: 6 }}>{info.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
