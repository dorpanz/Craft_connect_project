import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // 🔹 Fetch profile function (returns user data)
  const fetchProfile = async (role) => {
    setLoading(true); // ✅ Ensure loading starts before fetching
    const url = role === "seller" ? "/api/v1/seller/profile" : "/api/v1/user/profile";

    try {
        const res = await fetch(`http://localhost:5000${url}`, {
            method: "GET",
            credentials: "include",
        });

        console.log("Profile Fetch Response:", res);
        const data = await res.json();
        console.log("Profile Fetch Data:", data);

        if (res.ok && data.status) {
            localStorage.setItem("userData", JSON.stringify(data.seller || data.user));
            setUser(data.seller || data.user);
            setLoading(false); // ✅ Mark loading as false after data is set
            return data.seller || data.user;
        } else {
            console.error("Error:", data.message);
            logout();
            setLoading(false); // ✅ Ensure loading is false even on error
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false); // ✅ Ensure loading is false even on failure
        return null;
    }
};

useEffect(() => {
  const storedRole = localStorage.getItem("userRole");
  const storedUser = localStorage.getItem("userData");

  if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false); // ✅ Mark loading as false immediately
  }

  if (storedRole && !storedUser) {
      setRole(storedRole);
      fetchProfile(storedRole);
  } else {
      setLoading(false);
  }
}, []);

// 🔹 Login function
const login = async (email, password, role) => {
    setLoading(true);
    try {
        const endpoint = role === "seller" 
            ? "http://localhost:5000/api/v1/seller/login" 
            : "http://localhost:5000/api/v1/user/login";

        const res = await axios.post(endpoint, 
            { email, password }, 
            { withCredentials: true } // ✅ Critical for cookies!
        );

        console.log("Full Login Response:", res.data);

        const userData = await fetchProfile(role);
        if (!userData) {
            console.error("Failed to fetch user profile after login.");
            return null;
        }

        localStorage.setItem("userRole", role);
        if (role === "seller") {
            localStorage.setItem("shopName", userData.shopName || "Your Shop");
            setUser({ ...userData, shopName: userData.shopName });
        } else {
            localStorage.setItem("username", userData.username || "User");
            setUser({ ...userData, username: userData.username });
        }

        setRole(role);
        return { role, user: userData };
    } catch (error) {
        console.error("Error logging in:", error.response?.data?.message || error.message);
        return null;
    } finally {
        setLoading(false);
    }
};

// 🔹 Logout function
const logout = async () => {
    try {
        const role = localStorage.getItem("userRole"); 
        const logoutEndpoint = role === "seller" 
            ? "http://localhost:5000/api/v1/seller/logout"
            : "http://localhost:5000/api/v1/user/logout";

        const res = await fetch(logoutEndpoint, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Logout failed:", res.statusText);
        }
    } catch (err) {
        console.error("Logout error:", err);
    }

    // Clear stored data and update state
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.removeItem("shopName");
    localStorage.removeItem("username");

    setUser(null);
    setRole(null);

    // Redirect to the main page
    navigate("/");  // Redirect to home page (change path if needed)

    // ✅ Force re-render using a state update
    setTimeout(() => setLoading(false), 100); 
};

return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};