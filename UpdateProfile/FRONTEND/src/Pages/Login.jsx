import { useState } from "react";
import { api } from "../api/axiosInstance";
import { Link , useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("api/v1/login", {
        email,
        password,
      });
      console.log("Login successful");
      navigate('/profile')
     
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-amber-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-amber-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-amber-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-amber-600 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
