import { useState, useEffect } from 'react';
import LoginModal from './Components/Login';
import Profile from './Components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setShowLogin(true);
    }
  }, []);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setShowLogin(false);
  };
 console.log(showLogin)
  return (
    <Router>
      {/* Show modal if not logged in */}
      {showLogin && <LoginModal onLoginSuccess={handleLoginSuccess} />}


      {/* Routes only if token exists */}
      {token && (
        <Routes>
          <Route path='/' element={<Profile />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
