import React from 'react';

const Login = ({ onLogin }) => {
  const bodyStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
    fontFamily: 'sans-serif',
  };

  const boxStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '1rem',
    backgroundColor: '#6a5acd',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={bodyStyle}>
      <div style={boxStyle}>
        <h2>Welcome to WeGo 👋</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <input type="email" placeholder="Email" style={inputStyle} />
          <input type="password" placeholder="Password" style={inputStyle} />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
