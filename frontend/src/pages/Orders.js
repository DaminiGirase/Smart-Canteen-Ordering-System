import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("You must be logged in to view your orders.");
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch {
        setError("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, [token]);

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">My Orders</h2>

      {error && <p className="text-red-500 font-medium mb-4 text-center">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <p className="font-semibold mb-1">
                <span className="text-gray-600">Order ID:</span> {order._id}
              </p>
              <p className="font-semibold mb-1">
                <span className="text-gray-600">Total:</span> ₹{order.totalCost}
              </p>
              <p className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${statusColor(order.status)} mb-2`}>
                {order.status}
              </p>
              <div>
                <strong className="text-gray-700">Items:</strong>
                <ul className="list-disc list-inside mt-1">
                  {order.items.map((i, index) => (
                    <li key={index}>
                      {i.menuItem?.name || "Item"} x {i.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
