import React from "react";
import {  Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const userRole = Cookie.get("role");

  const isAdmin = userRole === "admin";
  if (isAdmin === false) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
