import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { FaUser } from "react-icons/fa";
import arrow from "../shop-view-seller/pics/arrow.png";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

const SellerChat = () => {
  const { user } = useAuth();
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

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
            const userId = chat.chatId.split("_")[0];
            try {
              const userDoc = await getDoc(doc(db, "users", userId));
              if (userDoc.exists()) {
                return {
                  ...chat,
                  buyerName: userDoc.data().username || "Buyer",
                };
              }
            } catch (err) {
              console.error("Error fetching user:", err);
            }
            return chat;
          })
        );

        setChatList(formattedChats);
      }
    });

    return () => unsubscribe();
  }, [user]);

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
    const buyerId = chatId.split("_")[0]; // userId is always first

    const sellerChatRef = doc(db, "chats", user.uid);
    const buyerChatRef = doc(db, "chats", buyerId);
    const messagesRef = doc(db, "messages", chatId);

    try {
      // Update messages
      const messagesSnap = await getDoc(messagesRef);
      const prevMessages = messagesSnap.exists() ? messagesSnap.data().messages || [] : [];
      await setDoc(messagesRef, {
        messages: [...prevMessages, newMessage],
      });

      // Update seller's chatList
      const sellerChatSnap = await getDoc(sellerChatRef);
      const sellerList = sellerChatSnap.exists() ? sellerChatSnap.data().chatList || [] : [];
      const sellerHasChat = sellerList.some(c => c.chatId === chatId);
      if (!sellerHasChat) {
        await setDoc(sellerChatRef, {
          chatList: [...sellerList, { chatId }]
        });
      }

      // Update buyer's chatList
      const buyerDocSnap = await getDoc(doc(db, "users", buyerId));
      const buyerFullName = buyerDocSnap.exists() ? buyerDocSnap.data().fullName || "" : "";

      const buyerChatSnap = await getDoc(buyerChatRef);
      const buyerList = buyerChatSnap.exists() ? buyerChatSnap.data().chatList || [] : [];
      const buyerHasChat = buyerList.some(c => c.chatId === chatId);
      if (!buyerHasChat) {
        await setDoc(buyerChatRef, {
          chatList: [...buyerList, { chatId, shopName: selectedChat.shopName || "" }]
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
            <div className="chat-header"><h3>Messages</h3></div>
            {chatList.map((chat, idx) => (
              <div
                key={idx}
                className={`chat-item ${selectedChat?.chatId === chat.chatId ? "active" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                 <FaUser /> {chat.buyerName || "Customer"}
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="chat-box">
            <div className="chat-header">
                                     <Link to="/account-settings-user" className="go-back">
                                       <img src={arrow} alt="arrow" className="arrow" />
                                     </Link>
              <h3>{selectedChat?.buyerName || "Select a chat"}</h3>
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

export default SellerChat;
