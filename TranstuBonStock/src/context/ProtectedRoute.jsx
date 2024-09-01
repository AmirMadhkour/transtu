
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext'; // Import default export

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(LoginContext); // Use useContext to access the context value

  return isAuthenticated ? element : <Navigate to="/Login" />;
};

export default ProtectedRoute;
