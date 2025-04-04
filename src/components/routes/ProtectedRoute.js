import { useAuth } from "../../context/AuthContext";  // Adjust the path if needed
import { Navigate, Outlet } from "react-router-dom";  // Add the import for Navigate and Outlet

const ProtectedRoute = ({ allowedRoles }) => {
    const { role: userRole } = useAuth();  // Get role directly from context
    const token = localStorage.getItem("authToken");

    console.log("Token:", token);
    console.log("UserRole:", userRole);
    console.log("AllowedRoles:", allowedRoles);

    if (!token) {
        return <Navigate to="/user-login" replace />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;