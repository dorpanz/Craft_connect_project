import React from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";
import { AnimatedSection } from "../animation/AnimatedSection";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, syncCartToFirestore, loading } = useCart();

  // Calculate total price excluding shipping cost
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.amount, 0)
      .toFixed(2);
  };

  const calculateShipping = () => {
    const total = parseFloat(calculateTotal()); // Get the total price of items in the cart
    
    // If total price exceeds $80, shipping is free
    if (total > 80) {
      return "0.00"; // Free shipping
    }
  
    // Otherwise, sum up shipping costs from all items
    return cart
      .reduce((totalShipping, item) => {
        // Convert shippingCost to number before adding
        const shippingCost = parseFloat(item.shippingCost) || 0; // Fallback to 0 if invalid
        return totalShipping + shippingCost;
      }, 0)
      .toFixed(2); // Sum up shipping cost of each item and return with 2 decimal places
  };
  
  


  return (
    <div>
      <Menu />
      <div className="cart-container">
        <h1>Your Cart</h1>
        <AnimatedSection>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : cart.length === 0 ? (
            <p className="empty-cart-message">No products in your cart.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Link to={`/item-listing/${item.id}`} className="item-link">
                      <img
                        src={item.photos?.[0] || "/placeholder.jpg"}
                        alt={item.title}
                        className="cart-image"
                      />
                    </Link>

                    <div className="cart-details">
                      <div className="cart-details-title">
                        <p>
                          <Link to={`/item-listing/${item.id}`} className="item-link">
                            {item.title}
                          </Link>
                        </p>
                        <p>Subtotal: ${(item.price * item.amount).toFixed(2)}</p>
                      </div>
                      <p>Price: ${item.price.toFixed(2)}</p>

                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.personalization && <p>Personalization: {item.personalization}</p>}
                      
                      {/* Shipping cost for this item */}
                      <p>Shipping: ${item.shippingCost}</p>
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.amount <= 1} // Disable if amount is 1 or less
                          className="quantity-controls-btn"
                        >
                          -
                        </button>
                        <span>{item.amount}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.amount >= item.quantity} // Disable if amount exceeds stock
                          className="quantity-controls-btn"
                        >
                          +
                        </button>
                        <button className="remove-cart" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    

                    
                  </div>
                  
                ))}
              </div>

              <div className="cart-summary">
                <h2>Total: CAD${calculateTotal()}</h2>
                <h3>Shipping Cost: CAD${calculateShipping()}</h3>
                <h2>Grand Total: CAD${(parseFloat(calculateTotal()) + parseFloat(calculateShipping())).toFixed(2)}</h2>
                <Link to="/payment-details">
                  <button
                    className="proceed-button" // Sync cart to Firestore after payment
                  >
                    Proceed to Payment
                  </button>
                </Link>
              </div>
            </>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CartPage;
