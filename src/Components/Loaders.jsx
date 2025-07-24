// Components/Loaders.jsx
import React from 'react';
import './Loaders.css'; // Paste the CSS content in this file

const Loaders = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>

      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>
    </div>
  );
};

export default Loaders;
