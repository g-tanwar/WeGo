import React from 'react';
import Navbar from '../Components/Navbar.jsx';

const recommendations = [
  {
    icon: '📖',
    title: 'Recommended Blog: React Best Practices',
    description: 'Learn the top tips and tricks for writing clean React code.',
  },
  {
    icon: '🎥',
    title: 'Video: Async JavaScript Explained',
    description: 'Watch this short video to master async/await and promises.',
  },
  {
    icon: '📝',
    title: 'Quiz: Test Your CSS Skills',
    description: 'Take this quick quiz to check your CSS fundamentals.',
  },
  {
    icon: '💡',
    title: 'Course: Introduction to TypeScript',
    description: 'Start learning TypeScript with this beginner-friendly course.',
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

const ForYou = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>✨ For You</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              animationDelay: `${idx * 0.2 + 0.2}s`,
            }}
          >
            <span style={{ fontSize: 36 }}>{rec.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 20 }}>{rec.title}</div>
              <div style={{ color: '#555', fontSize: 16, marginTop: 6 }}>{rec.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ForYou;
