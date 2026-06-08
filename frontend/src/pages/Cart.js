import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Card = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!token) {
      setMessage("You must be logged in to place an order.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          items: cart.map((i) => ({
            menuItem: i._id,
            quantity: i.quantity,
          })),
          totalCost,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Order placed successfully!");
      clearCart();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Your Cart</h2>
      {message && (
        <p
          className={`text-center mb-4 font-semibold ${
            message.includes("success") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-700 font-medium">Price: ₹{item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-all duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Total: ₹{totalCost}</h3>
            <button
              onClick={placeOrder}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Card;
