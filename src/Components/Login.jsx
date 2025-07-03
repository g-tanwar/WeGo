import React from 'react';

const Login = () => {
  // Apply full height to root
  const bodyStyle = {
    margin: 0,
    padding: 0,
    height: '100vh',                                      
    background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

  const linkStyle = {
    color: '#6a5acd',
    textDecoration: 'none',
    fontWeight: '500',
  };

  return (
    <div style={bodyStyle}>
      <div style={boxStyle}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Welcome to WeGo 👋</h2>
        <form>
          <input type="email" placeholder="Email" style={inputStyle} />
          <input type="password" placeholder="Password" style={inputStyle} />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Don't have an account? <a href="#" style={linkStyle}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
