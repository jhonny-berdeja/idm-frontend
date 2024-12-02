import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser? JSON.parse(storedUser) : { isAuthenticated: false, role: null };
  });

  const login = (role) => {
    const newUser = {
      isAuthenticated: true,
      role,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    const newUser = {
      isAuthenticated: false,
      role: null,
    };
    setUser(newUser);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
