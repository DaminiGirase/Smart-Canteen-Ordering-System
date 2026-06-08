import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ for redirect after logout

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/menu" className="hover:text-purple-400 transition">Menu</Link>
        <Link to="/orders" className="hover:text-purple-400 transition">Orders</Link>
        <Link to="/cart" className="hover:text-purple-400 transition">Cart</Link>
        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-purple-400 transition">Admin</Link>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-semibold text-purple-300">Hello, {user.name}!</span>
            <button
              onClick={() => {
                logout();          // ✅ clear token & user state
                navigate("/login"); // ✅ redirect to login
              }}
              className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
