import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const { addToCart } = useContext(CartContext);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/menu`);
        setMenu(res.data);
      } catch {
        setError("Failed to load menu items");
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setSuccess(`${item.name} added to cart successfully!`);
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">Menu</h2>

      {error && <p className="text-red-500 font-medium mb-4 text-center">{error}</p>}
      {success && <p className="text-green-500 font-medium mb-4 text-center">{success}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menu.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="font-bold text-gray-900 mb-4">₹{item.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-auto px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
