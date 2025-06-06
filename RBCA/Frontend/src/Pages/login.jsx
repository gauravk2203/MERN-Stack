import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/all/login", {
        email,
        password,
      });

      const token = res.data.token;
      login(token);
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed! Check credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
