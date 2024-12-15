import React, { useState } from 'react';
import Banner from '../../components/Banner';
import './SignIn.css';
import { Si42 } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
// import axios from 'axios';
import { handleLogin42 } from './AuthUtils';

const SignIn = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if(email && password){
        e.preventDefault();
      
        login(email, password)
          .then(() => {
            console.log('Navigating to home after login');
            navigate('/home'); // Redirect on successful login
          })
          .catch((err) => {
            console.error('Login failed:', err.message || err);
            setError('Login failed. Please try again.'); // Display error to the user
          });
    }
  };

  const handleClickCreateAccount = () => {
    navigate('/signUp');
  };

  return (
    <div className='sin-container'>
      <div className='sin-banner'><Banner /></div>
      <div className='sin-container-content'>
        <div className='sin-title-welcome'>Welcome Back</div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='sin-input'
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='sin-input'
            />
          </div>
          {error && <p className='sin-error'>{error}</p>}
          <div><button type="submit" className='sin-button-login'>Login</button></div>
          <div className="sin-create-account">
            <div>Don't have an account?</div>
            <div onClick={handleClickCreateAccount} className="sin-create-account-button">Sign up</div>
          </div>
          <div className="sin-text-or">Or</div>
          <div className="sin-login-by">
            <div className="sin-login-intra" onClick={handleLogin42}><Si42 /></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;



