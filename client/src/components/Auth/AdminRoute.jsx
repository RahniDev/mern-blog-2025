import React, { Component } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";


export const AdminRoute = ({ children }) => {
  let location = useLocation();
  
  if (!isAuthenticated()) {
    return <Navigate to="/admin-login" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;