import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIslog } = useAuth();

  useEffect(() => {
    
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    if (status === 'success') {
      setIslog(true);
      navigate('/home');
    } else if (status === 'failed') {
      console.error('Login failed');
      navigate('/signIn');
    } else {
      console.warn('Unexpected status:', status);
      navigate('/signIn');
    }
  }, [location, navigate, setIslog]);

  return <div>Processing login...</div>;
};

export default LoginCallback;