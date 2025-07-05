import React, { useState } from 'react';
import Navbar from './Navbar.jsx';

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState('');
  const [showPrevious, setShowPrevious] = useState(true);

  const handlePost = () => {
    if (newDoubt.trim() === '') return;
    const newEntry = {
      text: newDoubt,
      answers: [],
      askedAt: new Date().toLocaleString(),
      postedBy: 'You', // You can replace this with logged-in user's name later
    };
    setDoubts([newEntry, ...doubts]);
    setNewDoubt('');
  };

  const handleAnswer = (index, answerText) => {
    const updatedDoubts = [...doubts];
    updatedDoubts[index].answers.push(answerText);
    setDoubts(updatedDoubts);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>💬 My Doubts</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <textarea
            rows="3"
            value={newDoubt}
            onChange={(e) => setNewDoubt(e.target.value)}
            placeholder="What's your doubt?"
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              resize: 'none',
            }}
          />
          <button
            onClick={handlePost}
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#6a5acd',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Post Doubt
          </button>
        </div>

        <button
          onClick={() => setShowPrevious(!showPrevious)}
          style={{
            backgroundColor: '#eee',
            border: 'none',
            borderRadius: '0.4rem',
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showPrevious ? '🙈 Hide Previous Doubts' : '👀 View Previous Doubts'}
        </button>

        {showPrevious &&
          doubts.map((doubt, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              borderLeft: '5px solid #6a5acd',
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>❓ {doubt.text}</p>
              <div style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.7rem',
                display: 'flex',
                gap: '1rem',
              }}>
                <div>📅 Asked at: {doubt.askedAt}</div>
                <div>💾 Saved by: {doubt.postedBy}</div>
              </div>

              <input
                type="text"
                placeholder="Answer this..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAnswer(index, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontSize: '0.95rem',
                  borderRadius: '0.4rem',
                  border: '1px solid #ccc',
                }}
              />

              {doubt.answers.length > 0 && (
                <div style={{ marginTop: '0.8rem' }}>
                  <strong>Answers:</strong>
                  <ul style={{ marginTop: '0.4rem' }}>
                    {doubt.answers.map((ans, i) => (
                      <li key={i} style={{ fontSize: '0.95rem', marginTop: '0.3rem' }}>📝 {ans}</li>
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
