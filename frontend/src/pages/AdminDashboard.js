import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [error, setError] = useState("");

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/menu`);
      setMenu(res.data);
    } catch {
      setError("Failed to fetch menu.");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data);
    } catch {
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchMenu();
      fetchOrders();
    }
  }, [token, user]);

  const addMenuItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/menu`, newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewItem({ name: "", description: "", price: "" });
      fetchMenu();
    } catch {
      setError("Failed to add menu item.");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update order.");
    }
  };

  if (user?.role !== "admin") {
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">
        Access denied. Admins only.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-4xl font-bold text-purple-700 text-center">
        Admin Dashboard
      </h2>

      {error && <p className="text-red-500 font-medium text-center">{error}</p>}

      {/* Add new menu item */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Add Menu Item</h3>
        <form className="space-y-4" onSubmit={addMenuItem}>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300"
          >
            Add
          </button>
        </form>
      </div>

      {/* Manage menu */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-purple-700">Menu Items</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {menu.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-lg text-gray-800">
                {item.name} - ₹{item.price}
              </p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Manage orders */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-purple-700">Orders</h3>
        <div className="space-y-4">
          {orders
            .filter((order) => order.status !== "Completed") // ✅ filter out completed
            .map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col space-y-4"
              >
                {/* Order & User Info */}
                <div>
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>User:</strong> {order.user.name} ({order.user.email}
                    )
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalCost}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Items Ordered:</h4>
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        <p>
                          <strong>{item.menuItem.name}</strong> (
                          {item.menuItem.description})
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <p>₹{item.menuItem.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Status Update Buttons */}
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => updateOrderStatus(order._id, "Preparing")}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Preparing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, "Completed")}
                    className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
                  >
                    Completed
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
