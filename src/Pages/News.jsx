import React from 'react';
import Navbar from '../Components/Navbar.jsx';

const newsList = [
  {
    title: 'WeGo Launches New Course!',
    description: 'Check out our latest course on AI and Machine Learning, now live for all users.',
    emoji: '🚀',
  },
  {
    title: 'Leaderboard Updated',
    description: 'The weekly leaderboard has been refreshed. See who made it to the top!',
    emoji: '🏆',
  },
  {
    title: 'Doubt Solving Marathon',
    description: 'Join our 24-hour doubt-solving event and win exciting rewards.',
    emoji: '💡',
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

const News = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>📰 Top News</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {newsList.map((news, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{news.emoji}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{news.title}</div>
              <div style={{ color: '#555', fontSize: 16, marginTop: 6 }}>{news.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
