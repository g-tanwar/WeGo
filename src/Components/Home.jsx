import React from 'react';
import Navbar from './Navbar.jsx';

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Welcome to WeGo 🎓</h1>
        <p>This is your personalized learning dashboard.</p>
      </div>
    </>
  );
};

export default Home;
