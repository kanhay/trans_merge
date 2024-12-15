import React, { useState } from 'react';
import Banner from '../../components/Banner';
import './SignUp.css'
import { Si42 } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleLogin42 } from './AuthUtils';



const SignUp = () => {
    // const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
  
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setEmailError("Please enter a valid email address.");
    //   return;
    // }
    

    if (password !== password2) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
  
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/register/',
      data: {
        email: email,
        password: password,
        password2: password2,
        display_name: username,
      },
    })
      .then((data) => {
        console.log(data);
        navigate('/signIn');
      })
      .catch((error) => {
        if (error.response) {
          const errorData = error.response.data;
  
          if (errorData.email) {
            setEmailError(errorData.email[0]);
          }
          if (errorData.password) {
            setPasswordError(errorData.password[0]);
          }
        } else {
          alert("Network error. Please check your connection.");
        }
      });
  };


    const handleClickCreateAccount = () =>{
      navigate('/signIn')
    }
    return (
      <div className='sup-container'>
        <div className='sup-banner'><Banner /></div>
        <div className='sup-container-content'>
            <div className='sup-title-welcome'>Welcome Back</div>
            <form action='submit' onSubmit={handleSignUp}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className='sup-input'
              />
            </div>
            <div>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='sup-input'
                  />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='sup-input'
                />
            </div>
            <div>
              <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className='sup-input'
                  />
            </div>
            {emailError && <p className='sup-error' >{emailError}</p>}
            {passwordError && <p className='sup-error' >{passwordError}</p>}
            <div><button type="submit" className='sup-button-login'>Sign up</button>

            </div>
            <div className="sup-create-account"><div> Already have an account?</div><div onClick={handleClickCreateAccount} className="sup-create-account-button">Sign in</div></div>
            <div className="sup-text-or">Or</div>
            <div className="sup-login-by">
              <div className="sup-login-intra" onClick={handleLogin42}><Si42 /></div>
            </div>
            </form>
        </div>
          
      </div> 
    );
  };
  
  export default SignUp;