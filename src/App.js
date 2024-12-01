import React from 'react';
import Login from './pages-view/Login';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
