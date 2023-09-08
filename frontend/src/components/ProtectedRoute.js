import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';

const ProtectedRoute = ({ element: Component }) => {
  const isLoggedIn = React.useContext(LoggedInContext);
  return isLoggedIn === true ? Component : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
