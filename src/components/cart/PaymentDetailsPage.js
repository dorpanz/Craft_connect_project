import React, { useState, useEffect } from "react";
import "./PaymentDetailsPage.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Import Cart Context
import { db, auth } from "../../firebase"; // Import Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { updateSalesCount } from "../../utils/orderFunctions";

const PaymentDetailsPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();
  const { cart, clearCart, calculateTotal } = useCart(); // Access cart and clearCart function from CartContext

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleConfirmOrder = async () => {
    if (!fullName || !email || !phone || !shippingAddress || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please enter complete card details.");
      return;
    }
  
    try {
      const userId = auth.currentUser?.uid;
  
      const order = {
        userId,
        items: cart,
        totalAmount: calculateTotal(),
        shippingAddress,
        paymentMethod,
        status: "pending",
        createdAt: new Date(),
      };
  
      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, order);
  
      // 🔥 Update sales count
      await updateSalesCount(cart);
  
      clearCart();
      navigate("/account-settings-user/your-orders");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };
  
  return (
    <div className="payment-container">
      <h1>Enter Payment & Shipping Details</h1>

      <div className="shipping-details">
        <h2>Shipping Details</h2>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Shipping Address:</label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        ></textarea>
      </div>

      <h2>Select Payment Method:</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          PayPal
        </label>

        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>

      {/* Show Card Details Form ONLY if "Credit/Debit Card" is Selected */}
      {paymentMethod === "card" && (
        <div className="card-details">
          <h2>Enter Card Details</h2>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />

          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />

          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>
      )}

      <button className="confirm-button" onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default PaymentDetailsPage;