// src/Components/Rankings.jsx

import React from 'react';
import Navbar from './Navbar.jsx';
import LeaderboardGraph from './LeaderboardGraph.jsx';

const Rankings = () => {
  const pageStyle = {
    padding: '2rem',
    background: '#f5f7fa',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  };

  const headingStyle = {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    animation: 'fadeIn 1s ease-in',
  };

  const thStyle = {
    backgroundColor: '#6a5acd',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '1rem',
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    fontSize: '1rem',
    transition: 'transform 0.3s ease',
  };

  const rankings = [
    { rank: 1, name: 'Gourav Tanwar', credits: 650, badge: '🥇 Gold' },
    { rank: 2, name: 'Kashu Jindal', credits: 540, badge: '🥈 Silver' },
    { rank: 3, name: 'Harsh Raj', credits: 480, badge: '🥉 Bronze' },
    { rank: 4, name: 'Aditi Mehta', credits: 430, badge: '⭐ Star' },
    { rank: 5, name: 'Ankur Yadav', credits: 410, badge: '🏅 Participant' },
  ];

  const getRowStyle = (rank, name) => {
    if (name === 'Gourav Tanwar') return { backgroundColor: '#f9d037' }; 
    if (rank === 1) return { backgroundColor: '#f9d037' }; // Gold
    if (rank === 2) return { backgroundColor: '#dfe6e9' }; // Silver
    if (rank === 3) return { backgroundColor: '#fab1a0' }; // Bronze
    return {};
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          tr:hover {
            transform: scale(1.02);
            transition: transform 0.3s;
          }
        `}
      </style>

      <Navbar />
      <div style={pageStyle}>
        <h1 style={headingStyle}>🏆 Student Rankings</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Rank</th>
              <th style={thStyle}>Student</th>
              <th style={thStyle}>Credits</th>
              <th style={thStyle}>Badge</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((student, index) => (
              <tr key={index} style={getRowStyle(student.rank, student.name)}>
                <td style={tdStyle}>{student.rank}</td>
                <td style={tdStyle}>{student.name}</td>
                <td style={tdStyle}>{student.credits}</td>
                <td style={tdStyle}>{student.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <LeaderboardGraph />

      </div>
    </>
  );
};

export default Rankings;
