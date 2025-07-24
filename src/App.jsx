import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Profile from './Components/Profile.jsx';
import Courses from './Components/Courses.jsx';
import Rankings from './Components/Rankings.jsx';
import Doubts from './Components/Doubts.jsx';
import Achievements from './Pages/Achievements.jsx';
import About from './Pages/About.jsx';
import News from './Pages/News.jsx';
import ForYou from './Pages/ForYou.jsx';
import Contact from './Pages/Contact.jsx';
import Credits from './Pages/Credits.jsx';
import Setting from './Pages/Setting.jsx';
import DarkModeContext from './Components/DarkModeContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('wego-dark-mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('wego-dark');
    } else {
      document.body.classList.remove('wego-dark');
    }
    localStorage.setItem('wego-dark-mode', darkMode);
  }, [darkMode]);

  const handleLogin = () => {
    console.log("Login Successful");
    setIsLoggedIn(true);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
          <Route path="/courses" element={isLoggedIn ? <Courses /> : <Navigate to="/" />} />
          <Route path="/rankings" element={isLoggedIn ? <Rankings /> : <Navigate to="/" />} />
          <Route path="/doubts" element={isLoggedIn ? <Doubts /> : <Navigate to="/" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/" />} />
          <Route path="/news" element={isLoggedIn ? <News /> : <Navigate to="/" />} />
          <Route path="/foryou" element={isLoggedIn ? <ForYou /> : <Navigate to="/" />} />
          <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/" />} />
          <Route path="/credits" element={isLoggedIn ? <Credits /> : <Navigate to="/" />} />
          <Route path="/setting" element={isLoggedIn ? <Setting /> : <Navigate to="/" />} />
          <Route path="/achievements" element={isLoggedIn ? <Achievements /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </DarkModeContext.Provider>
  );
}

export default App;
