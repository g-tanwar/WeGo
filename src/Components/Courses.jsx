import React from 'react';
import Navbar from './Navbar.jsx';

const Courses = () => {
  const pageStyle = {
    padding: '2rem',
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
    </>
  );
};

export default Courses;
