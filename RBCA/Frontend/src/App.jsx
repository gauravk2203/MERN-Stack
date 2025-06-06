import { AuthProvider } from "./AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comment from "./Components/Comment.jsx";
import Header from "./Components/Header.jsx";
import Login from "./Pages/login.jsx";
import Register from "./Pages/Register.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-950">
          <Header />
          <Routes>
            <Route path="/" element={<Comment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
