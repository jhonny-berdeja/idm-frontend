import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const mockAuthService = async (email, password) => {
  // Simula un servicio de autenticación
  if (email === "user@example.com" && password === "password") {
    return { token: "fake-token", role: "COMMON" };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await mockAuthService(email, password);
      login(response.role);
      navigate("/home")
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    email,
    password,
    error,
    handleInputChange,
    handleLogin,
  };
};
