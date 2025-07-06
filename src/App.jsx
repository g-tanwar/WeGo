import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Profile from './Components/Profile.jsx';
import Courses from './Components/Courses.jsx';
import Rankings from './Components/Rankings.jsx';
import Doubts from './Components/Doubts.jsx';


import Achievements from './Pages/Achievements.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("Login Successful");
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="/courses" element={isLoggedIn ? <Courses /> : <Navigate to="/" />} />
        <Route path="/rankings" element={isLoggedIn ? <Rankings /> : <Navigate to="/" />} />
        <Route path="/doubts" element={isLoggedIn ? <Doubts /> : <Navigate to="/" />} />
        

        <Route path="/achievements" element={isLoggedIn ? <Achievements /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
