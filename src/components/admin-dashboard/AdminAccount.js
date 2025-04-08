import React, { useEffect } from "react";
import "./adminAccount.css"; // Create a custom CSS file for styling
import securityImg from "./pic/security.png";
import dashboardImg from "./pic/dashboard.png"; // Admin dashboard image
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { Link } from "react-router-dom";
import user from "./pic/users.jpg"
import shop from "./pic/shops.jpg"
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
  {
    title: "Users Management",
    description: "Manage Users",
    imgSrc: user,
    link: "/admin/users-management",  // Link to login & security settings
  },
  {
    title: "Sellers Management",
    description: "Manage Sellers",
    imgSrc: shop,
    link: "/admin/sellers-management",  // Link to login & security settings
  },
];

const AdminAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Menu />
      <section className="account-section-1">
        <div className="account-section-1-cards-container">
          {adminAccountOptions.map((option, index) => (
            <Link key={index} to={option.link} className="account-section-1-card">
              <img
                src={option.imgSrc}
                alt={option.title}
                className="account-section-1-card-icon"
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
