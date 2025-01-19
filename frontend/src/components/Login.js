import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext); // Access the setAuth function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bank-management-4tyl.onrender.com/api/users/login', { email, password });
      const { token, user } = response.data; // Assuming response contains token and user

      // Store the token, userId, and username in context
      setAuth({ token, username: user.username, userId: user._id });

      // Optionally store the token, username, and userId in localStorage for persistence
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user._id);

      // Navigate to the dashboard or user account page
      navigate('/bank-accounts');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
