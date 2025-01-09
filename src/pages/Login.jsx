import React, { useState } from 'react';
import { useAuth } from '../routes/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const authenticateUser = async (email, password) => {
  const url = 'http://localhost:8080/authenticate'; 
  const credentials = { username: email, password: password };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falló la autenticación: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error en la autenticación: ${error.message}`);
  }
};

const parseAuthorities = (authoritiesString) => {
  return authoritiesString
    .replace(/\[|\]/g, '') 
    .split(',')             
    .map(role => role.trim()); 
};

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await authenticateUser(email, password); 
      console.log("Login successful:", data); 

      const token = data.jwt;
      console.log('token:', token); 
      const decodedToken = jwtDecode(token); 
      console.log('User decodedToken:', decodedToken); 
      
      const authorities = decodedToken.ROLES || '';
      const roles = parseAuthorities(authorities);
      login(roles, token);
      console.log('User authorities:', roles); 

      navigate('/home');
    } catch (error) {
      console.error('Error en la autenticación:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
