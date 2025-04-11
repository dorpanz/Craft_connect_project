import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Menu from '../menu/Menu';
import './Orders.css';

export const Orders = () => {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [currentSellerId, setCurrentSellerId] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [statusFilter, setStatusFilter] = useState('all'); // New state for status filter

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentSellerId(user.uid);
        try {
          const querySnapshot = await getDocs(collection(db, 'orders'));
          const groupedOrders = {};
          const userIdsToFetch = new Set();

          querySnapshot.forEach((docSnap) => {
            const orderData = docSnap.data();
            const sellerItems = orderData.items.filter(item => item.sellerId === user.uid);

            if (sellerItems.length > 0) {
              const userId = orderData.userId;
              userIdsToFetch.add(userId);

              if (!groupedOrders[userId]) {
                groupedOrders[userId] = [];
              }

              groupedOrders[userId].push({
                id: docSnap.id,
                createdAt: orderData.createdAt,
                items: sellerItems,
                status: orderData.status, // include status for the entire order
              });
            }
          });

          const userMapTemp = {};
          const usersSnapshot = await getDocs(collection(db, 'users'));
          usersSnapshot.forEach(userDoc => {
            const userData = userDoc.data();
            if (userIdsToFetch.has(userDoc.id)) {
              userMapTemp[userDoc.id] = userData.username || "Unknown User";
            }
          });

          setUserMap(userMapTemp);
          setOrdersByUser(groupedOrders);
        } catch (error) {
          console.error('Error fetching orders or users:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus // update status for the entire order
      });

      // Update local state
      setOrdersByUser(prev => {
        const newOrders = { ...prev };
        for (const userId in newOrders) {
          newOrders[userId] = newOrders[userId].map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: newStatus // update status in local state
                }
              : order
          );
        }
        return newOrders;
      });

      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to dynamically apply status classes
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  // Function to handle status filter change
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on the selected status
  const filteredOrders = Object.entries(ordersByUser).map(([userId, userOrders]) => {
    if (statusFilter === 'all') {
      return userOrders;
    }
    return userOrders.filter(order => order.status === statusFilter);
  });

  return (
    <div>
      <Menu />
      <div className="orders-container-seller">
        <h2 className="orders-title">Your Orders</h2>

        {/* Filter dropdown */}
        <div className="orders-filter">
          <label htmlFor="statusFilter">Filter by Status: </label>
          <select id="statusFilter" value={statusFilter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {Object.keys(ordersByUser).length === 0 ? (
  <p className="orders-empty">No orders yet.</p>
) : (
  Object.entries(ordersByUser).map(([userId, userOrders]) => {
    const filteredUserOrders =
      statusFilter === 'all'
        ? userOrders
        : userOrders.filter((order) => order.status === statusFilter);

    if (filteredUserOrders.length === 0) return null;

    return (
      <div key={userId} className="orders-customer-section">
        <h3 className="orders-customer-name">
          Customer: {userMap[userId] || userId}
        </h3>
        {filteredUserOrders.map(order => (
          <div key={order.id} className="orders-card">
            <p className="orders-date">
              Order Date: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
            </p>
            <div className="orders-items">
              {order.items.map((item) => (
                <div key={item.id} className={`orders-item ${getStatusClass(order.status)}`}>
                  <img
                    src={item.photos?.[0]}
                    alt={item.title}
                    className="orders-item-image"
                  />
                  <div className="orders-item-details">
                    <h4 className="orders-item-title">{item.title}</h4>
                    <p>Quantity: {item.amount}</p>
                    <p>Total: ${item.amount * item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="orders-status">
              <p>Status: {order.status}</p>
              <select
                className="orders-status-dropdown"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    );
  })
)}

      </div>
    </div>
  );
};
