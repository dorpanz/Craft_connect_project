import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (role) => {
    setLoading(true);
    const url =
      role === "seller" ? "/api/v1/seller/profile" : "/api/v1/user/profile";

    try {
      const res = await fetch(`http://localhost:5000${url}`, {
        method: "GET",
        credentials: "include",
      });

      console.log("Profile Fetch Response:", res);
      const data = await res.json();
      console.log("Profile Fetch Data:", data);

      if (res.ok && data.status) {
        localStorage.setItem(
          "userData",
          JSON.stringify(data.seller || data.user)
        );
        setUser(data.seller || data.user);
        setLoading(false);
        return data.seller || data.user;
      } else {
        console.error("Error:", data.message);
        logout();
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }

    if (storedRole && !storedUser) {
      setRole(storedRole);
      fetchProfile(storedRole);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const endpoint =
        role === "seller"
          ? "http://localhost:5000/api/v1/seller/login"
          : "http://localhost:5000/api/v1/user/login";

      const res = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
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
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const role = localStorage.getItem("userRole");
      const logoutEndpoint =
        role === "seller"
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

    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.removeItem("shopName");
    localStorage.removeItem("username");

    setUser(null);
    setRole(null);

    navigate("/");

    setTimeout(() => setLoading(false), 100);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
