import React, { useState, useContext } from 'react';
import Navbar from './Navbar.jsx';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import DarkModeContext from './DarkModeContext';

const Profile = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState('Gourav Tanwar');
  const [profilePicUrl, setProfilePicUrl] = useState('https://i.pinimg.com/736x/c4/12/ff/c412ff64c50d7db46adbc76bedd1b37a.jpg');
  const [tempName, setTempName] = useState(name);
  const [tempPic, setTempPic] = useState(profilePicUrl);

  const progressData = [
    { subject: 'HTML & CSS', progress: 90 },
    { subject: 'JavaScript', progress: 70 },
    { subject: 'React', progress: 40 },
  ];

  const overallData = [
    { name: 'Week 1', progress: 20 },
    { name: 'Week 2', progress: 35 },
    { name: 'Week 3', progress: 50 },
    { name: 'Week 4', progress: 70 },
    { name: 'Week 5', progress: 85 },
  ];

  const achievements = [
    { icon: '🥇', label: 'First Login' },
    { icon: '📚', label: 'Course Completed' },
    { icon: '💬', label: 'First Doubt Solved' },
    { icon: '🏆', label: 'Top Ranker' },
  ];

  const recentActivity = [
    'Completed React Course',
    'Solved a JavaScript Doubt',
    'Achieved Top 10 Rank',
    'Redeemed 100 Credits',
  ];

  const pageStyle = {
    padding: '2rem',
    background: darkMode ? '#181a20' : '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    color: darkMode ? '#f3f4f6' : '#222',
  };

  const cardStyle = {
    background: darkMode ? '#23272f' : 'white',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: darkMode ? '0 4px 15px rgba(0,0,0,0.32)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
    opacity: 0,
    transform: 'translateY(40px)',
    animation: 'fadeInUp 0.7s forwards',
  };

  const statGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  };

  const statCard = {
    background: '#e3f2fd',
    padding: '1.2rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  const nameSection = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: 'linear-gradient(to right, #1976d2, #42a5f5)',
    color: 'white',
    borderRadius: '1rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  };

  const profilePic = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    objectFit: 'cover',
  };

  const nameStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  };

  const progressContainer = {
    background: '#eee',
    borderRadius: '10px',
    height: '20px',
    width: '100%',
    overflow: 'hidden',
    marginTop: '0.5rem',
  };

  const progressBar = (value) => ({
    height: '100%',
    width: `${value}%`,
    backgroundColor: '#6a5acd',
  });

  // Edit Profile Modal
  const modalStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 2000,
  };
  const modalContent = {
    background: '#fff',
    borderRadius: 12,
    padding: 32,
    minWidth: 320,
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    display: 'flex', flexDirection: 'column', gap: 16,
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div style={nameSection}>
          <img 
            src={profilePicUrl}
            alt='profile-pic'
            style={profilePic}
          />
          <div>
            <div style={nameStyle}>👨‍🎓 {name}</div>
            <p>🥈 Silver Rank | 🎯 Credits: 560</p>
            <button onClick={() => { setTempName(name); setTempPic(profilePicUrl); setShowEdit(true); }} style={{ marginTop: 8, padding: '6px 16px', borderRadius: 8, border: 'none', background: '#fff', color: '#1976d2', fontWeight: 600, cursor: 'pointer' }}>Edit Profile</button>
          </div>
        </div>

        {showEdit && (
          <div style={modalStyle}>
            <div style={modalContent}>
              <h3>Edit Profile</h3>
              <label>Name:
                <input value={tempName} onChange={e => setTempName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
              </label>
              <label>Profile Pic URL:
                <input value={tempPic} onChange={e => setTempPic(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
              </label>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => { setName(tempName); setProfilePicUrl(tempPic); setShowEdit(false); }} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                <button onClick={() => setShowEdit(false)} style={{ padding: '6px 16px', borderRadius: 8, border: 'none', background: '#eee', color: '#222', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ ...cardStyle, animationDelay: '0.1s' }}>
          <h3>🏅 Recent Achievements</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
            {achievements.map((ach, idx) => (
              <div key={idx} style={{ background: '#f3f4f6', borderRadius: 8, padding: '10px 18px', fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{ach.icon}</span> <span>{ach.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...cardStyle, animationDelay: '0.2s' }}>
          <h3>🕒 Recent Activity</h3>
          <ul style={{ marginTop: 10, paddingLeft: 18 }}>
            {recentActivity.map((act, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>{act}</li>
            ))}
          </ul>
        </div>

        <div style={{ ...cardStyle, animationDelay: '0.3s' }}>
          <h3>📊 Quick Stats</h3>
          <div style={statGrid}>
            <div style={statCard}><h2>5</h2><p>Courses Completed</p></div>
            <div style={statCard}><h2>17</h2><p>Doubts Solved</p></div>
            <div style={statCard}><h2>#8</h2><p>Leaderboard Rank</p></div>
            <div style={statCard}><h2>560</h2><p>Credits Earned</p></div>
          </div>
        </div>

        <div style={{ ...cardStyle, animationDelay: '0.4s' }}>
          <h3>📈 Subject-wise Progress</h3>
          {progressData.map((item, index) => (
            <div key={index}>
              <p style={{ marginTop: '1rem' }}>{item.subject} - {item.progress}%</p>
              <div style={progressContainer}>
                <div style={progressBar(item.progress)}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...cardStyle, animationDelay: '0.5s' }}>
          <h3>📊 Weekly Overall Progress (Graph)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overallData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="progress" stroke="#6a5acd" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Profile;
