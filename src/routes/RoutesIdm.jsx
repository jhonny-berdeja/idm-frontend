import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages-view/Login';
import Home from '../pages-view/Home';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import Unauthorized from '../pages-view/Unauthorized';

const RoutesIdm = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute requiredRole="COMMON">
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default RoutesIdm;