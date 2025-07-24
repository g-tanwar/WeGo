
import React from "react";
import Navbar from '../Components/Navbar.jsx';

const achievements = [
  {
    icon: "🥇",
    title: "First Login",
    description: "Logged in for the first time!",
  },
  {
    icon: "📚",
    title: "Course Completed",
    description: "Completed your first course.",
  },
  {
    icon: "💬",
    title: "First Doubt Solved",
    description: "Solved your first doubt.",
  },
  {
    icon: "🏆",
    title: "Top Ranker",
    description: "Achieved a top 10 ranking.",
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

const Achievements = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "32px", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 24 }}>🏆 Achievements</h2>
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {achievements.map((ach, idx) => (
            <li
              key={idx}
              style={{
                ...cardStyle,
                animationDelay: `${idx * 0.2 + 0.2}s`,
              }}
            >
              <span style={{ fontSize: 32, marginRight: 20 }}>{ach.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{ach.title}</div>
                <div style={{ color: "#555", fontSize: 15 }}>{ach.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Achievements;