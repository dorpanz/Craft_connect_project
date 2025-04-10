import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminUserManage.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
export const AdminUserManage = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userActivity, setUserActivity] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const usersData = usersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleActivity = async (user) => {
    const alreadyExpanded = expandedUserId === user.id;
    setExpandedUserId(alreadyExpanded ? null : user.id);

    if (!alreadyExpanded && !userActivity[user.id]) {
      try {
        const [ordersSnap, reviewsSnap] = await Promise.all([
          getDocs(
            query(collection(db, "orders"), where("userId", "==", user.id))
          ),
          getDocs(
            query(collection(db, "reviews"), where("userId", "==", user.id))
          ),
        ]);

        const orders = ordersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const reviews = reviewsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const updatedReviews = await Promise.all(
          reviews.map(async (review) => {
            const itemSnap = await getDocs(
              query(
                collection(db, "products"),
                where("id", "==", review.itemId)
              )
            );
            const item =
              itemSnap.docs.length > 0 ? itemSnap.docs[0].data() : null;
            return { ...review, item };
          })
        );

        setUserActivity((prev) => ({
          ...prev,
          [user.id]: { orders, reviews: updatedReviews },
        }));
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    }
  };

  const handleBanUser = async (user) => {
    try {
      // Uncomment the line below to actually update the user's status in Firestore
      await updateDoc(doc(db, "users", user.id), { status: "banned" });

      alert(`User ${user.username} has been banned.`);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  return (
    <div className="admin-user-manage-container">
      <div className="admin-user-manage-container-top">
          <Link to="/admin/admin-account" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
        
          </Link>
          <h2 className="admin-user-manage-title">User Management</h2>
      </div>
      <div className="user-list-container">
        <div className="user-list-header">
          <div>Username</div>
          <div>Email</div>
          <div>Role</div>
          <div className="text-right">Actions</div>
        </div>

        {users.map((user) => (
          <div key={user.id} className="user-list-row">
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            <div className="text-right action-buttons">
              <button
                onClick={() => handleToggleActivity(user)}
                className="user-actions-button"
              >
                {expandedUserId === user.id
                  ? "Hide Activity"
                  : "View Activity"}
              </button>
              <button
                onClick={() => handleBanUser(user)}
                className="ban-button"
              >
                Ban User
              </button>
              <a
                href={`mailto:${user.email}`}
                className="contact-button"
                title="Email user"
              >
                Contact
              </a>
            </div>

            {expandedUserId === user.id && userActivity[user.id] && (
              <div className="activity-modal-container">
                <div className="activity-section">
                  <h3>Reviews</h3>
                  {userActivity[user.id].reviews.length > 0 ? (
                    <ul>
                      {userActivity[user.id].reviews.map((review) => (
                        <li key={review.id} className="activity-item">
                          <p>{review.comment}</p>
                          {review.imageUrls?.length > 0 && (
                            <div className="review-images">
                              {review.imageUrls.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`Review ${idx + 1}`}
                                  className="item-image"
                                  onClick={() => setSelectedImage(url)}
                                />
                              ))}
                            </div>
                          )}
                          <p className="item-info">
                            Rating:{" "}
                            <span className="font-medium">
                              {review.rating} ★
                            </span>{" "}
                            |{" "}
                            {new Date(
                              review.timestamp.seconds * 1000
                            ).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews found.</p>
                  )}
                </div>

                <div className="activity-section">
                  <h3>Orders</h3>
                  {userActivity[user.id].orders.length > 0 ? (
                    <ul>
                      {userActivity[user.id].orders.map((order) => (
                        <li key={order.id} className="activity-item">
                          <p>Total: ${order.totalAmount}</p>
                          <p>
                            {new Date(
                              order.createdAt.seconds * 1000
                            ).toLocaleString()}
                          </p>
                          <ul className="item-info">
                            {order.items?.map((item, idx) => (
                              <li key={idx}>{item.title}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Full view" />
            <button
              onClick={() => setSelectedImage(null)}
              className="close-button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
