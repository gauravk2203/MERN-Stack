import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) return;

    try {
      await axios.post("http://localhost:5000/all/register", { email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      alert("Failed to register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

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
          onClick={handleRegister}
          className="w-full p-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
