import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '2rem',
    fontFamily: 'sans-serif',
  };

  const sectionStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h2>📣 Welcome to WeGo!</h2>
          <p>Learn, Teach, and Grow together 🚀</p>
        </div>

        <div style={sectionStyle}>
          <h3>📹 Featured Video</h3>
          <p>🔗 How to Ace Math with Peer Explanations</p>
          <button>Watch Now</button>
        </div>

        <div style={sectionStyle}>
          <h3>❓ Latest Doubts</h3>
          <ul>
            <li>What is Binary Search? (2 answers)</li>
            <li>Why is Gravity negative in equations?</li>
            <li>Help in React Routing?</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
