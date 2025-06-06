import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-3 bg-gray-900 shadow-lg">
      <Link to="/" className="text-2xl font-bold text-white">
        YourApp
      </Link>

      <div className="flex gap-3">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
