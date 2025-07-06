import React from 'react';
import Navbar from './Navbar.jsx';

const Courses = () => {
    const pageStyle = {
        paddingTop: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingBottom: '2rem',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      };
      
  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#6a5acd',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const courses = [
    { title: 'HTML & CSS Basics', desc: 'Learn HTML and CSS from scratch.' },
    { title: 'JavaScript', desc: 'Master the fundamentals of JavaScript.' },
    { title: 'React Basics', desc: 'Build components & routes in React.' },
  ];

  return (
    <>
       <Navbar />
        
      <div style={pageStyle}>
        <h1>📚 Explore Courses</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {courses.map((course, index) => (
            <div key={index} style={cardStyle}>
              <h2>{course.title}</h2>
              <p>{course.desc}</p>
              <button style={buttonStyle}>View Course</button>
            </div>
          ))}
        </div>
      </div>
      {/* 🔥 Featured Videos Section */}
<div style={{ marginTop: '3rem', textAlign: 'left' }}>
  <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>🎥 Featured Lessons</h2>
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <div style={{ flex: '1 1 300px', background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h4>🔬 Physics: Newton's Laws</h4>
      <p>by Ayush Sharma</p>
      <button onClick={() => alert("Coming Soon!")} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>▶ Watch</button>
    </div>
    <div style={{ flex: '1 1 300px', background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h4>📐 Geometry: Circles</h4>
      <p>by Priya Verma</p>
      <button onClick={() => alert("Coming Soon!")} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>▶ Watch</button>
    </div>
  </div>
</div>

{/* ❓ Popular Doubts Section */}
<div style={{ marginTop: '3rem', textAlign: 'left' }}>
  <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>❓ Popular Doubts</h2>
  <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
    <p><strong>🧠 Q:</strong> Why does acceleration increase when force increases?</p>
    <p><strong>💡 A:</strong> Because F = ma. More force means more acceleration if mass is constant. — <i>Answered by Sahil</i></p>
  </div>
  <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginTop: '1rem' }}>
    <p><strong>🧠 Q:</strong> How do I remember trigonometric identities easily?</p>
    <p><strong>💡 A:</strong> Use mnemonic codes like “Some People Have...” etc. — <i>Answered by Anjali</i></p>
  </div>
</div>
    </>
  );
};

export default Courses;
