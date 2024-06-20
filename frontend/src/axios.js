// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set this to your backend base URL
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Adjust according to how you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
