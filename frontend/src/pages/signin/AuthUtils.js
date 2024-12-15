import axios from 'axios';

export const handleLogin42 = () => {

  axios({
    method: 'GET',
    url: 'http://localhost:8000/api/auth/42/login/',
    withCredentials: true,
  })
    .then((response) => {
      const { auth_url } = response.data;
      if (auth_url) {
        window.location.href = auth_url;
      } else {
        console.error('Authorization URL not provided by the backend');
      }
    })
    .catch((error) => {
      console.error('Error during 42 login:', error.message || error);
    });
};
