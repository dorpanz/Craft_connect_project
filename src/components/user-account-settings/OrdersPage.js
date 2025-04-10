import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase"; // Import Firebase setup
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"; // Firestore query functions
import "./OrdersPage.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [cancelReason, setCancelReason] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // New state for the status filter
  const [user, setUser] = useState(null); // Track user authentication state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        return; // Skip fetching orders if no user is authenticated
      }

      const userId = user.uid;
      const ordersQuery = query(collection(db, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(ordersQuery);

      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        const orderData = doc.data();
        const orderDate = orderData.createdAt
          ? orderData.createdAt.toDate().toLocaleDateString()
          : 'Date not available';

        fetchedOrders.push({
          id: doc.id,
          total: orderData.totalAmount, // Using the totalAmount field from the DB
          date: orderDate,              // Store formatted date here
          status: orderData.status,
          items: orderData.items,
        });
      });

      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [user]); // Only fetch orders when the user is authenticated

  const cancelOrder = async (orderId) => {
    const reason = cancelReason[orderId] || "";
    if (!reason.trim()) {
      alert("Please select a reason for canceling the order.");
      return;
    }

    try {
      await deleteDoc(doc(db, "orders", orderId)); // Firestore delete operation
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);

      alert("Order canceled and deleted successfully.");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("There was an error canceling the order.");
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + (item.price * item.amount); // Multiply price by quantity for each item
    }, 0);
  };

  const calculateShipping = (items) => {
    const total = calculateTotal(items);
    if (total > 80) return 0.00; // Free shipping

    return items.reduce((shippingTotal, item) => {
      const shippingCost = parseFloat(item.shippingCost) || 0;
      return shippingTotal + shippingCost;
    }, 0).toFixed(2);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = statusFilter === "All" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  // Function to dynamically assign status color classes
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "shipped":
        return "status-completed";
      case "delivered":
        return "status-in-delivery";
      default:
        return "status-default";
    }
  };

  return (
    <div>
      <Menu />
      <div className="orders-container">
        <h2 className="orders-title">Your Orders</h2>
        
        <div className="status-filter">
          <label htmlFor="status">Filter by Status: </label>
          <select id="status" value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="no-orders">No orders match the selected status.</p>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => {
              const recalculatedTotal = calculateTotal(order.items);
              const shippingCost = calculateShipping(order.items);
              const grandTotal = recalculatedTotal + parseFloat(shippingCost);

              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">{order.date}</p>
                  </div>
                  <p className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </p>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        {item.photos && item.photos.length > 0 && (
                          <Link to={`/item-listing/${item.id}`}
                          style={{ textDecoration: "none" }}> 
                          <img
                            src={item.photos[0]} 
                            alt={item.title || item.name}
                            className="order-item-img"
                            />
                            </Link>
                        )}
                        <div className="order-item-details">
                          <p>{item.title || item.name}</p>
                          <p>${item.price} x {item.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="order-total">Total: <strong>${recalculatedTotal.toFixed(2)}</strong></p>
                  <p className="order-shipping">Shipping: <strong>${shippingCost}</strong></p>
                  <p className="order-grand-total">Grand Total: <strong>${grandTotal.toFixed(2)}</strong></p>
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
                    <button className="cancel-order-btn" onClick={() => cancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
