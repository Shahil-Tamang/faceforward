import axios from 'axios';

// Configure your external API base URL here
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true';

console.log('API Base URL:', API_BASE_URL);
console.log('Using Mock API:', USE_MOCK_API);

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

// Mock data for testing
const mockUsers = {
  'test@example.com': { 
    id: '1', 
    name: 'Test User', 
    email: 'test@example.com', 
    password: 'password123' 
  },
};

// Mock login function
const mockLogin = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers[email];
      if (user && user.password === password) {
        resolve({
          success: true,
          data: {
            user: { id: user.id, name: user.name, email: user.email },
            token: 'mock-token-' + Date.now(),
          },
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid email or password',
        });
      }
    }, 1000);
  });
};

// Mock register function
const mockRegister = async (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockUsers[email]) {
        resolve({
          success: false,
          message: 'Email already registered',
        });
      } else {
        mockUsers[email] = { id: Date.now().toString(), name, email, password };
        resolve({
          success: true,
          data: {
            user: { id: mockUsers[email].id, name, email },
            token: 'mock-token-' + Date.now(),
          },
        });
      }
    }, 1000);
  });
};

export const loginUser = async (email, password) => {
  try {
    if (USE_MOCK_API) {
      console.log('Using mock login for:', email);
      return await mockLogin(email, password);
    }

    console.log('Attempting login with:', email);
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
    if (USE_MOCK_API) {
      console.log('Using mock register for:', email);
      return await mockRegister(name, email, password);
    }

    console.log('Attempting registration with:', email);
    const response = await authApi.post('/auth/register', { name, email, password });
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
