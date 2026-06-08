import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      {/* Background Image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://www.orchardhotel.com.au/wp-content/uploads/2024/10/The-Orchard-Hotel-Chatswood-Restaurant-Bar-48.jpg')",
        }}
      ></div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-4">
          Welcome to Quick Bite 🍔
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8">
          Order your favorite meals from the canteen — fast and easy!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/menu"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 hover:shadow-xl transition-all duration-300"
          >
            View Menu
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-purple-50 hover:shadow-xl transition-all duration-300 border border-purple-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
