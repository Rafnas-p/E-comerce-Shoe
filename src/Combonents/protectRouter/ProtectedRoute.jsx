import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element: Element, adminOnly = false, ...rest }) => {
  const token = Cookie.get('token'); 
  const userRole = Cookie.get('role'); 

  const isLoggedIn = !!token; 
  const isAdmin = userRole === 'admin'; 

  return (
    <Route
      {...rest}
      element={
        isLoggedIn && (!adminOnly || isAdmin) 
          ? Element 
          : <Navigate to="/login" replace /> 
      }
    />
  );
};

export default ProtectedRoute;
