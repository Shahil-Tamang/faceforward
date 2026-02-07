import axios from 'axios';

// Configure your external API base URL here
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Using real backend at:', API_BASE_URL);

    const response = await authApi.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Login error details:', error);
    const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
    console.log('Login error message:', message);
    return {
      success: false,
      message: message,
      error: error,
    };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Using real backend at:', API_BASE_URL);

    // Note: Backend expects 'username', frontend form sends 'name'
    const response = await authApi.post('/auth/register', { username: name, email, password });
    console.log('Registration response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Registration error details:', error);
    const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
    console.log('Registration error message:', message);
    return {
      success: false,
      message: message,
      error: error,
    };
  }
};

export default authApi;
