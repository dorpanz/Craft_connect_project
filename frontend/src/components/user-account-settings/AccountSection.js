import React, { useEffect } from "react";
import "./AccountSection.css";
import ordersImg from "./pic/orders.png";
import securityImg from "./pic/security.png";
import subscriptionsImg from "./pic/subscriptions.png";
import messagesImg from "./pic/messages.png";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { Link } from "react-router-dom";
const accountOptions = [
  {
    title: "Your orders",
    description: "Track, return, cancel an order or buy again",
    imgSrc: ordersImg,
    link: "/account-settings-user/your-orders",  
  },
  {
    title: "Login & Security",
    description: "Manage password, email and mobile phone",
    imgSrc: securityImg,
    link: "/account-settings-user/login-security",  
  },
  {
    title: "Your Subscriptions",
    description: "Manage your favourite shops",
    imgSrc: subscriptionsImg,
    link: "/account-settings-user/your-subscriptions",  
  },
  {
    title: "Messages",
    description: "Ask direct questions to shops",
    imgSrc: messagesImg,
    link: "/account-settings-user/chat",  
  },
];

const AccountSection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Menu/>
    <section className="account-section-1">
      <h2>Your Account</h2>
      <div className="account-section-1-cards-container">
          {accountOptions.map((option, index) => (
            <Link key={index} to={option.link} className="account-section-1-card">
              <img src={option.imgSrc} alt={option.title} className="account-section-1-card-icon" />
              <div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </section>
    <Footer/>
    </div>
  );
};

export default AccountSection;
