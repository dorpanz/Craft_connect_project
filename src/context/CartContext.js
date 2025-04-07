import { createContext, useState, useContext, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create Cart Context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // 🔹 Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                setCart([]); // clear cart when user logs out
            }
        });

        return () => unsubscribe();
    }, []);

    // 🔹 Fetch cart from Firestore on load or auth change
    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) {
                setLoading(true); // Set to true until confirmed empty
                setCart([]);
                setTimeout(() => setLoading(false), 300); // Delay to avoid flash
                return;
            }

            try {
                const cartDoc = await getDoc(doc(db, "carts", userId));
                if (cartDoc.exists()) {
                    setCart(cartDoc.data().items || []);
                } else {
                    setCart([]);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
            setLoading(false);
        };

        fetchCart();
    }, [userId]);

    // 🔹 Sync cart to Firestore
    const syncCartToFirestore = async (updatedCart) => {
        if (!userId) return;
        try {
            await setDoc(doc(db, "carts", userId), { items: updatedCart });
        } catch (error) {
            console.error("Failed to sync cart:", error);
        }
    };

    // 🔹 Add item
    const addToCart = async (item) => {
        if (!item.id) {
            console.error("Item is missing 'id':", item);
            return;
        }

        // Fetch item data from Firestore to check stock quantity
        const itemRef = doc(db, "products", item.id);
        const itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
            const productData = itemSnap.data();
            const availableQuantity = productData.quantity;
            const shippingCost = productData.shippingCost || 5; 
            // Check if the requested quantity is available
            // if (item.quantity > availableQuantity) {
            //     console.error("Not enough stock available.");
            //     return; // Prevent adding to cart if stock is insufficient
            // }

            setCart((prevCart) => {
                const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
                const updatedCart = existingItem
                  ? prevCart.map((cartItem) =>
                      cartItem.id === item.id
                        ? { ...cartItem, amount: cartItem.amount + item.amount, shippingCost }
                        : cartItem
                    )
                  : [...prevCart, { ...item, shippingCost }];

                syncCartToFirestore(updatedCart);
                return updatedCart;
            });

            // Decrease the quantity in the product document in Firestore
        } else {
            console.error("Item not found in the database.");
        }
    };

    // 🔹 Remove item
    const removeFromCart = async (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            syncCartToFirestore(updatedCart);
            return updatedCart;
        });
    };

    // 🔹 Clear cart
    const clearCart = async () => {
        setCart([]);
        if (userId) {
            try {
                await updateDoc(doc(db, "carts", userId), { items: [] });
            } catch (error) {
                console.error("Failed to clear cart:", error);
            }
        }
    };

    // 🔹 Update quantity
// Update Quantity in CartContext
const updateQuantity = async (id, amountChange) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
            item.id === id
                ? { ...item, amount: Math.max(1, item.amount + amountChange) } // Ensure 'amount' updates correctly
                : item
        );
        syncCartToFirestore(updatedCart); // Sync with Firestore
        return updatedCart;
    });
};


    // 🔹 Calculate total
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                calculateTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
