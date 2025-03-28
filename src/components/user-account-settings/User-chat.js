import React, { useEffect, useState } from "react";
import "./User-chat.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const UserChat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  const [selectedChat, setSelectedChat] = useState("JohnCrafts");
  const [messages, setMessages] = useState({
    JohnCrafts: [
      { sender: "JohnCrafts", text: "Hello! This is John's Shop. Thank you for ordering!", type: "received" },
      { sender: "JohnCrafts", text: "The shipping would be via UK Postmate", type: "received" },
      { sender: "You", text: "Hi! Can you make it faster?", type: "sent" }
    ],
    Bearwithlove: []
  });
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [...prevMessages[selectedChat], { sender: "You", text: message, type: "sent" }]
      }));
      setMessage("");
    }
  };

  return (
    <div>
      <Menu/>
    <div className="body-chat">

    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-list">
        <div className="chat-header">
          <h3>Chats</h3>
        </div>
        <div className={`chat-item ${selectedChat === "JohnCrafts" ? "active" : ""}`} onClick={() => setSelectedChat("JohnCrafts")}>
          🛠️ JohnCrafts
        </div>
        <div className={`chat-item ${selectedChat === "Bearwithlove" ? "active" : ""}`} onClick={() => setSelectedChat("Bearwithlove")}>
          🐻 Bearwithlove
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-box">
        <div className="chat-header">
          <Link to="/account-settings-user" className="back-btn">←</Link>
          <h3>{selectedChat}</h3>
          <div className="chat-icons">
            <span>📞</span>
            <span>🔍</span>
            <span>⋮</span>
          </div>
        </div>
        <div className="chat-body">
          {messages[selectedChat].length > 0 ? (
            messages[selectedChat].map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))
          ) : (
            <p className="empty-chat">No messages yet.</p>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
            </div>
            </div>
  );
};

export default UserChat;
