import React, { useEffect, useState } from "react";
import "./SubscriptionPage.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png"

const SubscriptionPage = () => {
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Menu/>
    <div className="subscription-container">
    <div className="edit-section-title">
          <Link to="/account-settings-user" className="go-back"><img src={arrow} alt="arrow" className="arrow" /></Link>
          <p className="edit-featured-title">Your subscription</p>
        </div>
      <p>Manage your favorite shops and newsletter subscriptions.</p>
      {subscribed && <p>You are subscribed to our updates! ✅</p>}
    </div>
    </div>
  );
};

export default SubscriptionPage;
