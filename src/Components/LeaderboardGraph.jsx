import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const LeaderboardGraph = () => {
  const data = [
    {
      name: 'Gourav',
      credits: 650,
      badge: '🥇 Gold',
      img: 'https://i.pinimg.com/736x/c4/12/ff/c412ff64c50d7db46adbc76bedd1b37a.jpg',
    },
    {
      name: 'Kashu',
      credits: 540,
      badge: '🥈 Silver',
      img: 'https://i.pinimg.com/736x/ee/ce/ba/eeceba0076f54334c6a3d7496db8681a.jpg',
    },
    {
      name: 'Harsh',
      credits: 480,
      badge: '🥉 Bronze',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Aditi',
      credits: 430,
      badge: '⭐ Star',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Ankur',
      credits: 410,
      badge: '🏅 Participant',
      img: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
  ];

  const colors = ['#ffd700', '#c0c0c0', '#cd7f32', '#6a5acd', '#42a5f5'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const student = payload[0].payload;
      return (
        <div style={{ background: '#fff', padding: '1rem', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <img src={student.img} alt={student.name} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '0.5rem', transition: 'transform 0.3s ease' }} />
          <p><b>{student.name}</b></p>
          <p>Credits: {student.credits}</p>
          <p>Badge: {student.badge}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarLabel = ({ x, y, index }) => {
    const student = data[index];
    return (
      <image
        href={student.img}
        x={x - 45}
        y={y - 5}
        width={35}
        height={35}
        style={{ borderRadius: '50%' }}
      />
    );
  };

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>📊 Leaderboard Performance Graph</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 60 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 14 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="credits" radius={[0, 10, 10, 0]} label={<CustomBarLabel />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index] || '#6a5acd'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaderboardGraph;
