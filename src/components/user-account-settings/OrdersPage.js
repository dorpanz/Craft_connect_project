import React, { useState, useEffect } from "react";
import "./OrdersPage.css";
import Menu from "../menu/Menu";
import amber from"./pic/amber1.jpg"
import bag from "./pic/bag1.jpg"
import chair1 from "./pic/chair1.jpg"
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [cancelReason, setCancelReason] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Mock data for testing
    const mockOrders = [
      {
        id: 1,
        total: 45.99,
        date: "Feb 12, 2025",
        status: "Processing",
        items: [
          { name: "Handmade Bracelet", price: 15.99, quantity: 2, image: amber },
          { name: "Vintage Earrings", price: 14.99, quantity: 1, image:bag  },
        ],
      },
      {
        id: 2,
        total: 29.99,
        date: "Feb 10, 2025",
        status: "Shipped",
        items: [
          { name: "Wooden Sculpture", price: 29.99, quantity: 1, image: chair1 },
        ],
      },
    ];

    localStorage.setItem("orders", JSON.stringify(mockOrders));
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const cancelOrder = (orderId) => {
    const reason = cancelReason[orderId] || "";
    if (!reason.trim()) {
      alert("Please select a reason for canceling the order.");
      return;
    }

    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("Order canceled successfully.");
  };

  return (
    <div>
      <Menu/>
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <p className="order-date">{order.date}</p>
              </div>
              <p className="order-status">{order.status}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <div className="order-item-details">
                      <p>{item.name}</p>
                      <p>${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="order-total">Total: <strong>${order.total}</strong></p>
              <div className="cancel-section">
                <select 
                  className="cancel-reason"
                  value={cancelReason[order.id] || ""}
                  onChange={(e) => setCancelReason({ ...cancelReason, [order.id]: e.target.value })}
                  >
                  <option value="">Select a reason</option>
                  <option value="Changed my mind">Changed my mind</option>
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Found a better price">Found a better price</option>
                  <option value="Other">Other</option>
                </select>
                <button className="cancel-button" onClick={() => cancelOrder(order.id)}>
                  ❌ Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default OrdersPage;
