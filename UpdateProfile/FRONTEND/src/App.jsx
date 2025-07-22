import LoginModal from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import Register from './Pages/Register.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './hooks/userAuth.js';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/profile" : "/login"} />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/profile" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginModal /> : <Navigate to="/profile" />}
        />

        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
