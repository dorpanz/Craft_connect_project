import React, { useState } from "react";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";


const SellersChat = () => {
  const [selectedChat, setSelectedChat] = useState("MissyJan");
  const [messages, setMessages] = useState({
    MissyJan: [
      { sender: "MissyJan", text: "Hello! This is John's Shop. Thank you for ordering!", type: "received" },
      { sender: "MissyJan", text: "The shipping would be on 5th December", type: "received" },
      { sender: "You", text: "Hi! Can you make it faster?", type: "sent" }
    ],
    FunziesKev: [],
    Kleo9019: [],
    HoHoHoX4: []
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
        <h3 className="chat-title">Chats</h3>
        {Object.keys(messages).map((chat) => (
          <div key={chat} className={`chat-item ${selectedChat === chat ? "active" : ""}`} onClick={() => setSelectedChat(chat)}>
            {chat}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-box">
        <div className="chat-header">
          <Link to="/your-shop-dashboard" className="back-btn">←</Link>
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
            placeholder="Hmm, I can offer you a fast delivery"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          <button onClick={sendMessage}>▶</button>
        </div>
      </div>
            </div>
    </div>
            </div>
  );
};

export default SellersChat;
