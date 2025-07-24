import React from 'react';
import Navbar from '../Components/Navbar.jsx';

const creditsData = [
  {
    icon: '💰',
    title: 'Total Credits',
    value: '1200',
    description: 'Your current available credits.',
  },
  {
    icon: '🎁',
    title: 'Rewards Redeemed',
    value: '5',
    description: 'Number of rewards you have redeemed.',
  },
  {
    icon: '🔥',
    title: 'Streak Bonus',
    value: '+200',
    description: 'Bonus credits for your 7-day learning streak!',
  },
  {
    icon: '⭐',
    title: 'Referral Credits',
    value: '300',
    description: 'Credits earned by referring friends.',
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

const Credits = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>💰 Your Credits</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {creditsData.map((credit, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{credit.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{credit.title}</div>
              <div style={{ color: '#222', fontSize: 22, fontWeight: 700, margin: '6px 0' }}>{credit.value}</div>
              <div style={{ color: '#555', fontSize: 16 }}>{credit.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Credits;
