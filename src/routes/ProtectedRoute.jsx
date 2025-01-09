import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    
    if (!user || !user.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && (!user.roles || !user.roles.includes(requiredRole))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
  };
  

export default ProtectedRoute;