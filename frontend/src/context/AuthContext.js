import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [islog, setIslog] = useState(false);

  // const token = localStorage.getItem('access_token');
  // if (token) {
  //   setIslog(true);
  // }
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await axios.get('http://localhost:8000/api/islogged/', {
        withCredentials: true
      });
      setIslog(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIslog(false);
    }
  };

  const login = (email, password) => {
    return axios({
      method: 'post',
      url: 'http://localhost:8000/api/login/',
      data: {
        email: email,
        password: password,
      },
      withCredentials:true
    },)
      .then((response) => {
        // const { access, refresh } = response.data;

        // localStorage.setItem('access_token', access);
        // localStorage.setItem('refresh_token', refresh);
        
        setIslog(true);
        return response.data;
      })
      .catch((error) => {
        setIslog(false)
        console.error('Login error:', error);
        // throw error;
      });
    };

    const logout = () => {
      return axios({
        method: 'post',
        url: 'http://localhost:8000/api/logout/',
        withCredentials: true,
      })
      .then(() => {
        setIslog(false);
      })
      .catch((error) => {
        console.error('Logout error:', error);
        setIslog(false);
      });
    };

  return (
    <AuthContext.Provider value={{ setIslog, islog, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
