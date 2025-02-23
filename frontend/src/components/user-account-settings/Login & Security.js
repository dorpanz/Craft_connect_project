import React, { useEffect, useState, useContext } from "react"; 
import "./LoginSecurity.css"; 
import arrow from "../shop-view-seller/pics/arrow.png"
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AuthContext } from "../../context/AuthContext";

const LoginSecurity = () => {
  const { logout } = useContext(AuthContext);
  const [fields, setFields] = useState({
    name: "John Doe",
    email: "john.doe@gmail.com",
    mobile: "+1(647)477-566",
    password: "***************",
  });

  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setEditingField(null);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Menu/>
      <div className="login-security">
        <div className="edit-section-title">
          <Link to="/account-settings-user" className="go-back"><img src={arrow} alt="arrow" className="arrow" /></Link>
          <p className="edit-featured-title">Login and Security</p>
        </div>
        <div className="login-sec-card">
          {Object.keys(fields).map((fieldKey) => (
            <div className="login-sec-card-field" key={fieldKey}>
              <span className="login-sec-card-label">{fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}:</span>
              {editingField === fieldKey ? (
                <input
                  type={fieldKey === "password" ? "password" : "text"}
                  name={fieldKey}
                  value={fields[fieldKey]}
                  onChange={handleInputChange}
                  className={`login-sec-card-edit-input ${editingField === fieldKey ? 'show' : ''}`}
                />
              ) : (
                <span className="login-sec-card-value">{fields[fieldKey]}</span>
              )}
              {editingField === fieldKey ? (
                <button className="login-sec-card-save-button" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="login-sec-card-edit-button" onClick={() => handleEditClick(fieldKey)}>
                  Edit
                </button>
              )}
            </div>
          ))}
          <button onClick={logout} className="logout-button">LOGOUT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LoginSecurity