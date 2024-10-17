import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
