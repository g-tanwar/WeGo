import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import coursesData from '../Data/CoursesData.js';

const spinnerStyle = {
  width: '48px',
  height: '48px',
  border: '6px solid #eee',
  borderTop: '6px solid #6a5acd',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '40px auto',
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // ✅ Simulating API call
  useEffect(() => {
    setTimeout(() => {
      setCourses(coursesData);
      setLoading(false);
    }, 1000); // 1 second delay to mimic API
  }, []);

  const categories = ['All', ...Array.from(new Set(coursesData.map(c => c.category)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || course.category === category;
    return matchesSearch && matchesCategory;
  });

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
    opacity: 0,
    transform: 'translateY(40px)',
    animation: 'fadeInUp 0.7s forwards',
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <h1>📚 Explore Courses</h1>
        <div style={{ display: 'flex', gap: 16, margin: '24px 0', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc', flex: 1, minWidth: 180 }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16, color: '#555' }}>
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </div>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={spinnerStyle}></div>
            <h2>Loading Courses...</h2>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {filteredCourses.map((course, idx) => (
              <div key={course.id} style={{ ...cardStyle, animationDelay: `${idx * 0.1 + 0.1}s` }}>
                <img src={course.thumbnail} alt={course.title} style={{ width: '100%', borderRadius: '10px', height: '180px', objectFit: 'cover' }} />
                <h2>{course.title}</h2>
                <p style={{ fontSize: '14px' }}>{course.desc}</p>
                <p><b>Category:</b> {course.category}</p>
                <a href={course.url} target="_blank" rel="noreferrer">
                  <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#6a5acd', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>View Course</button>
                  <p style={{color:'green'}}><i></i > {course.source}</p>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
