import React from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import { useCart } from "../../context/CartContext"; 
import "./CartPage.css";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart(); 

    
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <Menu />
            <div className="cart-container">
                <h1>Your Cart</h1>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.photos_videos[0]} alt={item.title} className="cart-image" />
                                    <div className="cart-details">
                                        <h3>{item.title}</h3>
                                        <p>CAD$ {item.price}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <p>Total: CAD${item.price * item.quantity}</p>
                                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2>Total: CAD${calculateTotal()}</h2>

                        <Link to="/payment-details">
                            <button className="proceed-button">Proceed to Payment</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
