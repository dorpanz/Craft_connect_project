import React, { useEffect } from "react";
import "./adminAccount.css"; // Create a custom CSS file for styling
import securityImg from "./pic/security.png";
import dashboardImg from "./pic/dashboard.png"; // Admin dashboard image
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { Link } from "react-router-dom";

const adminAccountOptions = [
  {
    title: "Product Verification Dashboard",
    description: "Manage and verify products for the marketplace.",
    imgSrc: dashboardImg,
    link: "/admin-dashboard",  // Link to admin's product verification dashboard
  },
  {
    title: "Login & Security",
    description: "Sign out of Admin Account.",
    imgSrc: securityImg,
    link: "/admin/login-security",  // Link to login & security settings
  },
];

const AdminAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Menu />
      <section className="admin-account-section">
        <div className="admin-account-cards-container">
          {adminAccountOptions.map((option, index) => (
            <Link key={index} to={option.link} className="admin-account-card">
              <img
                src={option.imgSrc}
                alt={option.title}
                className="admin-account-card-icon"
              />
              <div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminAccount;
