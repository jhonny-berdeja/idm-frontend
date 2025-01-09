import React from 'react';
import { useAuth } from '../routes/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {user.isAuthenticated ? (
        <div>
          <p>Welcome back! You are logged in as:</p>
          <ul>
            {Array.isArray(user.roles) && user.roles.length > 0 ? (
              user.roles.map((role, index) => <li key={index}>{role}</li>)
            ) : (
              <li>No roles assigned</li>
            )}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in. Please log in to access the site.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
