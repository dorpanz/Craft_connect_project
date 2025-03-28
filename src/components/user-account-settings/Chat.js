import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = auth.currentUser?.uid; // Get logged-in user ID

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [userId, navigate]);

  const chatId = userId && sellerId ? `${userId}_${sellerId}` : null;

  useEffect(() => {
    if (!chatId) return; // Prevent errors if chatId is null

    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim() && chatId) {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: userId,
        receiverId: sellerId,
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Seller</h2>
      </div>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.senderId === userId ? "message sent" : "message received"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
