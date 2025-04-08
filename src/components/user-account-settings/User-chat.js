import React, { useEffect, useState } from "react";
import "./User-chat.css";
import Menu from "../menu/Menu";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import arrow from "../shop-view-seller/pics/arrow.png";
import { FaStore } from "react-icons/fa";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const UserChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const sellerIdFromProfile = location.state?.sellerId || null;
  const sellerNameFromProfile = location.state?.shopName || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "chats", user.uid), async (docSnap) => {
      if (docSnap.exists()) {
        const chatListRaw = docSnap.data().chatList || [];

        const formattedChats = await Promise.all(
          chatListRaw.map(async (chat) => {
            if (!chat.shopName && chat.chatId.includes("_")) {
              const sellerId = chat.chatId.split("_")[1];
              try {
                const sellerDoc = await getDoc(doc(db, "sellers", sellerId));
                if (sellerDoc.exists()) {
                  return {
                    ...chat,
                    shopName: sellerDoc.data().shopName || "Unknown Seller",
                  };
                }
              } catch (err) {
                console.error("Error fetching seller:", err);
              }
            }
            return chat;
          })
        );

        setChats(formattedChats);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (sellerIdFromProfile && user) {
      const chatId = `${user.uid}_${sellerIdFromProfile}`;
      setSelectedChat({ chatId, shopName: sellerNameFromProfile });
    }
  }, [sellerIdFromProfile, user]);

  useEffect(() => {
    if (!selectedChat?.chatId) return;

    const unsubscribe = onSnapshot(doc(db, "messages", selectedChat.chatId), (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!message.trim() || !user || !selectedChat) return;

    const newMessage = {
      senderId: user.uid,
      text: message,
      timestamp: Date.now(),
    };

    const chatId = selectedChat.chatId;
    const sellerId = chatId.split("_")[1]; // Always seller is second
    const userChatRef = doc(db, "chats", user.uid);
    const sellerChatRef = doc(db, "chats", sellerId);
    const messagesRef = doc(db, "messages", chatId);

    try {
      // Update messages
      const messagesSnap = await getDoc(messagesRef);
      const prevMessages = messagesSnap.exists() ? messagesSnap.data().messages || [] : [];
      await setDoc(messagesRef, {
        messages: [...prevMessages, newMessage],
      });

      // Update user's chatList
      const userChatSnap = await getDoc(userChatRef);
      const userList = userChatSnap.exists() ? userChatSnap.data().chatList || [] : [];
      const userHasChat = userList.some(c => c.chatId === chatId);
      if (!userHasChat) {
        await setDoc(userChatRef, {
          chatList: [...userList, { chatId, shopName: selectedChat.shopName || "" }]
        });
      }

      // Update seller's chatList
      const sellerChatSnap = await getDoc(sellerChatRef);
      const sellerList = sellerChatSnap.exists() ? sellerChatSnap.data().chatList || [] : [];
      const sellerHasChat = sellerList.some(c => c.chatId === chatId);
      if (!sellerHasChat) {
        await setDoc(sellerChatRef, {
          chatList: [...sellerList, { chatId, shopName: selectedChat.shopName || "" }]
        });
      }

      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div>
      <Menu />
      <div className="body-chat">
        <div className="chat-container">
          {/* Sidebar */}
          <div className="chat-list">
            <div className="chat-header"><h3>Chats</h3></div>
            {chats.map((chat, idx) => (
              <div
                key={idx}
                className={`chat-item ${selectedChat?.chatId === chat.chatId ? "active" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                <FaStore className="shop-icon" /> {chat.shopName || "Shop"}

              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="chat-box">
            <div className="chat-header">
                        <Link to="/account-settings-user" className="go-back">
                          <img src={arrow} alt="arrow" className="arrow" />
                        </Link>
              <h3>{selectedChat?.shopName || "Select a chat"}</h3>
              <div className="chat-icons">
              </div>
            </div>
            <div className="chat-body">
              {messages.length > 0 ? (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-message ${msg.senderId === user.uid ? "sent" : "received"}`}
                  >
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
