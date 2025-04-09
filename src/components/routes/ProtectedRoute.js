import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { role: userRole, loading } = useAuth(); // Get role and loading from context
  const token = localStorage.getItem("authToken");

  // Block route access while loading user role
  if (loading) {
    return null; // Or you could return a loading spinner
  }

  console.log("Token:", token);
  console.log("UserRole:", userRole);
  console.log("AllowedRoles:", allowedRoles);

  // Not authenticated — redirect to login
  if (!token) {
    return <Navigate to="/user-login" replace />;
  }

  // Authenticated but not authorized — redirect based on actual role
  if (!userRole || !allowedRoles.includes(userRole)) {
    switch (userRole) {
      case "user":
        return <Navigate to="/account-settings-user" replace />;
      case "seller":
        return <Navigate to="/your-shop-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/user-login" replace />;
    }
  }

  // Authorized — allow access to protected route
  return <Outlet />;
};

export default ProtectedRoute;
