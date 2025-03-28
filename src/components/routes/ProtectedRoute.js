import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole"); // Store role after login

    if (!token) {
        return <Navigate to="/user-login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Redirect unauthorized users
    }

    return <Outlet />;
};

export default ProtectedRoute;
