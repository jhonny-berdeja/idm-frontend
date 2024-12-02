import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
  });

  const login = (role) => {
    setUser({
      isAuthenticated: true,
      role,
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
