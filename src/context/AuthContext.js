import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create authentication context
export const AuthContext = createContext();

// Custom hook for consuming AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(localStorage.getItem("userRole") || null);
    const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 🔹 Watch Firebase Auth state (Auto-login if already authenticated)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                let userDoc = await getDoc(doc(db, "users", currentUser.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({ uid: currentUser.uid, email: currentUser.email, ...userData });
                    setRole("user");
                    setDisplayName(userData.fullName);
                    localStorage.setItem("userRole", "user");
                    localStorage.setItem("displayName", userData.fullName);
                } else {
                    userDoc = await getDoc(doc(db, "sellers", currentUser.uid));

                    if (userDoc.exists()) {
                        const sellerData = userDoc.data();
                        setUser({ uid: currentUser.uid, email: currentUser.email, ...sellerData });
                        setRole("seller");
                        setDisplayName(sellerData.shopName);
                        localStorage.setItem("userRole", "seller");
                        localStorage.setItem("displayName", sellerData.shopName);
                    } else {
                        console.warn("User data not found in Firestore.");
                        setUser(null);
                        setRole(null);
                        setDisplayName(null);
                        localStorage.removeItem("userRole");
                        localStorage.removeItem("displayName");
                    }
                }
            } else {
                setUser(null);
                setRole(null);
                setDisplayName(null);
                localStorage.removeItem("userRole");
                localStorage.removeItem("displayName");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 🔹 Register function (Handles both users & sellers)
    const registerUser = async (email, password, role, fullNameOrShopName) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const collection = role === "seller" ? "sellers" : "users";
            const nameField = role === "seller" ? "shopName" : "fullName";

            // Store user data in Firestore
            await setDoc(doc(db, collection, user.uid), { 
                email, 
                role, 
                [nameField]: fullNameOrShopName 
            });

            setUser({ uid: user.uid, email, role, [nameField]: fullNameOrShopName });
            setRole(role);
            setDisplayName(fullNameOrShopName);
            localStorage.setItem("userRole", role);
            localStorage.setItem("displayName", fullNameOrShopName);
            
            return { success: true };
        } catch (error) {
            console.error("Signup Error:", error.message);
            if (error.code === "auth/email-already-in-use") {
                return { error: "This email is already in use. Please use a different email." };
            } else if (error.code === "auth/weak-password") {
                return { error: "Password should be at least 6 characters long." };
            } else if (error.code === "auth/invalid-email") {
                return { error: "Invalid email format. Please enter a valid email." };
            } else {
                return { error: "Something went wrong. Please try again." };
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Login function (Checks both users & sellers)
    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            if (typeof email !== "string" || typeof password !== "string") {
                throw new Error("Invalid email or password format.");
            }
    
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;
    
            let userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser({ uid: user.uid, email: user.email, ...userData });
                setRole("user");
                setDisplayName(userData.fullName);
                localStorage.setItem("userRole", "user");
                localStorage.setItem("displayName", userData.fullName);
                return { success: "user" };  // ✅ Return user role
            }
    
            userDoc = await getDoc(doc(db, "sellers", user.uid));
            if (userDoc.exists()) {
                const sellerData = userDoc.data();
                setUser({ uid: user.uid, email: user.email, ...sellerData });
                setRole("seller");
                setDisplayName(sellerData.shopName);
                localStorage.setItem("userRole", "seller");
                localStorage.setItem("displayName", sellerData.shopName);
                return { success: "seller" }; // ✅ Return seller role
            }
    
            throw new Error("User data not found.");
        } catch (error) {
            console.error("Login Error:", error.message);
            return { error: "Invalid credentials. Please try again." };
        } finally {
            setLoading(false);
        }
    };
    

    // 🔹 Logout function
    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole(null);
            setDisplayName(null);
            localStorage.removeItem("userRole");
            localStorage.removeItem("displayName");
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            role, 
            displayName, 
            login: loginUser, 
            logout: logoutUser, 
            register: registerUser, 
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
