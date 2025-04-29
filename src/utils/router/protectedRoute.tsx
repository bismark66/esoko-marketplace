// components/PrivateRoute.jsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // Assuming `user` is null or undefined if not authenticated

  return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
