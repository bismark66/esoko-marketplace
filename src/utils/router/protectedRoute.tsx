// components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth(); // Assuming `user` is null or undefined if not authenticated
  const location = useLocation();
  // const { isLoading } = useAuth();

  // if (isLoading) {
  //   return <FullPageLoader />;
  // }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
