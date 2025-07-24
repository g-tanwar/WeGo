import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

const StatsGraphs = () => {

  const pieData = [
    { name: 'Web Development', value: 450 },
    { name: 'DSA & Algorithms', value: 320 },
    { name: 'Backend Development', value: 200 },
    { name: 'System Design', value: 120 },
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'];

  const lineData = [
    { day: 'Mon', active: 40 },
    { day: 'Tue', active: 65 },
    { day: 'Wed', active: 75 },
    { day: 'Thu', active: 90 },
    { day: 'Fri', active: 55 },
    { day: 'Sat', active: 120 },
    { day: 'Sun', active: 150 },
  ];

  const barData = [
    { week: 'Week 1', credits: 300 },
    { week: 'Week 2', credits: 500 },
    { week: 'Week 3', credits: 450 },
    { week: 'Week 4', credits: 600 },
  ];

  return (
    <div style={{ marginTop: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '2rem' }}>📊 Platform Stats Overview</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>

        {/* Pie Chart */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>📚 Course Category Distribution</h3>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>👨‍🎓 Daily Active Students</h3>
          <ResponsiveContainer width={400} height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>🏆 Weekly Credits Earned</h3>
          <ResponsiveContainer width={400} height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="credits" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsGraphs;
