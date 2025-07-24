import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState('');
  const [category, setCategory] = useState('React');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showPrevious, setShowPrevious] = useState(true);
  const [topStats, setTopStats] = useState({ total: 0, answers: 0, topCategory: 'N/A' });

  useEffect(() => {
    const total = doubts.length;
    const answers = doubts.reduce((acc, curr) => acc + curr.answers.length, 0);
    const categoryCount = doubts.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    const topCategory = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0] || 'N/A';
    setTopStats({ total, answers, topCategory });
  }, [doubts]);

  const handlePost = () => {
    if (newDoubt.trim() === '') return;
    const newEntry = {
      id: Date.now(),
      text: newDoubt,
      category,
      upvotes: 0,
      answers: [],
      askedAt: new Date().toLocaleString(),
      postedBy: 'You',
    };
    const updatedDoubts = [newEntry, ...doubts].sort((a, b) => b.upvotes - a.upvotes);
    setDoubts(updatedDoubts);
    setNewDoubt('');
  };

  const handleUpvote = (id) => {
    const updatedDoubts = doubts.map(d =>
      d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d
    ).sort((a, b) => b.upvotes - a.upvotes);
    setDoubts(updatedDoubts);
  };

  const handleAnswer = (id, answerText) => {
    const updatedDoubts = doubts.map(d =>
      d.id === id ? { ...d, answers: [...d.answers, answerText] } : d
    );
    setDoubts(updatedDoubts);
  };

  const filteredDoubts = filterCategory === 'All' ? doubts : doubts.filter(d => d.category === filterCategory);

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>

        <div style={{ background: 'linear-gradient(135deg, #6a5acd, #9575cd)', color: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
          <h1>🚀 Got Doubts? Get Answers!</h1>
          <p>Ask, Upvote, and Help Your Peers Grow!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ background: '#ffffff33', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold' }}>Total Doubts: {topStats.total}</div>
            <div style={{ background: '#ffffff33', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold' }}>Total Answers: {topStats.answers}</div>
            <div style={{ background: '#ffffff33', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold' }}>Top Category: {topStats.topCategory}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <textarea
            rows="3"
            value={newDoubt}
            onChange={(e) => setNewDoubt(e.target.value)}
            placeholder="What's your doubt?"
            style={{ flex: 1, padding: '1rem', fontSize: '1rem', borderRadius: '0.8rem', border: '1px solid #ccc', resize: 'none', minWidth: '200px' }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.8rem', border: '1px solid #ccc' }}
          >
            <option value="React">React</option>
            <option value="DSA">DSA</option>
            <option value="Web Development">Web Development</option>
            <option value="CSS">CSS</option>
          </select>
          <button
            onClick={handlePost}
            style={{ padding: '1rem 2rem', backgroundColor: '#4caf50', color: 'white', fontSize: '1.1rem', borderRadius: '0.8rem', border: 'none', cursor: 'pointer' }}
          >✨ Post</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '1rem', fontSize: '1rem', borderRadius: '0.8rem', border: '1px solid #ccc' }}
          >
            <option value="All">All Categories</option>
            <option value="React">React</option>
            <option value="DSA">DSA</option>
            <option value="Web Development">Web Development</option>
            <option value="CSS">CSS</option>
          </select>
          <button
            onClick={() => setShowPrevious(!showPrevious)}
            style={{ backgroundColor: '#1976d2', color: 'white', padding: '1rem', fontSize: '1rem', borderRadius: '0.8rem', border: 'none', cursor: 'pointer' }}
          >{showPrevious ? '🙈 Hide Doubts' : '👀 Show Doubts'}</button>
        </div>

        {showPrevious && filteredDoubts.map((doubt) => (
          <div key={doubt.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '1.5rem', borderLeft: '8px solid #6a5acd', transition: 'transform 0.3s' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>❓ {doubt.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              <div>📅 {doubt.askedAt}</div>
              <div>🏷️ <b>{doubt.category}</b></div>
              <div>👍 {doubt.upvotes} upvotes</div>
              <div>💾 {doubt.postedBy}</div>
              <div style={{ background: '#4caf50', color: 'white', padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem' }}>{doubt.answers.length} Answers</div>
            </div>
            <button
              onClick={() => handleUpvote(doubt.id)}
              style={{ backgroundColor: '#ff5722', color: 'white', padding: '0.8rem 1.5rem', fontSize: '1rem', borderRadius: '0.8rem', border: 'none', cursor: 'pointer', marginBottom: '1rem', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >⬆ Upvote</button>
            <input
              type="text"
              placeholder="Answer this... (Press Enter)"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAnswer(doubt.id, e.target.value);
                  e.target.value = '';
                }
              }}
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '0.8rem', border: '1px solid #ccc' }}
            />
            {doubt.answers.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Answers:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                  {doubt.answers.map((ans, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>📝 {ans}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Doubts;
