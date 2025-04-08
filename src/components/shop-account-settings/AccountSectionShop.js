import React, { useEffect } from "react";
import "./AccountSection.css";
import ordersImg from "./pic/orders.png";
import securityImg from "./pic/security.png";
import subscriptionsImg from "./pic/subscriptions.png";
import messagesImg from "./pic/messages.png";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { Link } from "react-router-dom";
import addloo from "./pic/addlogo.png"
import orers from "./pic/ordersall.jpg"
const accountOptions = [
  {
    title: "Your shop",
    description: "View your listings, edit your shop page",
    imgSrc: ordersImg,
    link: "/your-shop",  // Add the link to this section
  },
  {
    title: "Add Items",
    description: "Add items, description and price",
    imgSrc: addloo,
    link: "/Add-Items",  // Add the link to this section
  },
  {
    title: "Orders",
    description: "Manage your orders",
    imgSrc: orers,
    link: "/your-shop-dashboard/orders",  // Add the link to this section
  },
  {
    title: "Login & Security",
    description: "Manage password, email and mobile phone",
    imgSrc: securityImg,
    link: "/your-shop-dashboard/login-security",  // Add the link to this section
  },
  {
    title: "Dashboard ",
    description: "Track you statistics overview, views and visits",
    imgSrc: subscriptionsImg,
    link: "/your-shop-dashboard/shop-statistics",  // Add the link to this section
  },

  {
    title: "Messages",
    description: "Manage your messages with clients",
    imgSrc: messagesImg,
    link: "/your-shop-dashboard/chat",  // Add the link to this section
  },

];

const AccountSectionShop = () => {
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

export default AccountSectionShop;
