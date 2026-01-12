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

// Mock data for testing - persist in localStorage
const getMockUsers = () => {
  const users = localStorage.getItem('mockUsers');
  return users ? JSON.parse(users) : {};
};

const saveMockUser = (email, userData) => {
  const users = getMockUsers();
  users[email] = userData;
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const mockUsers = getMockUsers();

// Mock login function
const mockLogin = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Validate email format
      if (!email || !email.includes('@')) {
        resolve({
          success: false,
          message: 'Please enter a valid email address',
        });
        return;
      }

      // Validate password
      if (!password || password.length === 0) {
        resolve({
          success: false,
          message: 'Please enter your password',
        });
        return;
      }

      // Check if user exists
      const currentMockUsers = getMockUsers();
      const user = currentMockUsers[email];
      if (!user) {
        resolve({
          success: false,
          message: 'User not found. Please sign up first.',
        });
        return;
      }

      // Check password
      if (user.password === password) {
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
          message: 'Invalid password. Please try again.',
        });
      }
    }, 1000);
  });
};

// Mock register function
const mockRegister = async (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Validate inputs
      if (!name || name.trim().length === 0) {
        resolve({
          success: false,
          message: 'Please enter your name',
        });
        return;
      }

      if (!email || !email.includes('@')) {
        resolve({
          success: false,
          message: 'Please enter a valid email address',
        });
        return;
      }

      if (!password || password.length < 6) {
        resolve({
          success: false,
          message: 'Password must be at least 6 characters',
        });
        return;
      }

      // Check if email already exists
      const currentMockUsers = getMockUsers();
      if (currentMockUsers[email]) {
        resolve({
          success: false,
          message: 'This email is already registered. Please login or use a different email.',
        });
      } else {
        // Create new user
        const newUser = { id: Date.now().toString(), name, email, password };
        saveMockUser(email, newUser);

        console.log('New user registered:', email);
        resolve({
          success: true,
          data: {
            user: { id: newUser.id, name, email },
            token: 'mock-token-' + Date.now(),
          },
        });
      }
    }, 1000);
  });
};

export const loginUser = async (email, password) => {
  try {
    const isMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Using Mock API:', isMockApi);
    console.log('Registered Users:', Object.keys(mockUsers));

    if (isMockApi) {
      console.log('✅ Using MOCK login');
      return await mockLogin(email, password);
    }

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
    const isMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Using Mock API:', isMockApi);

    if (isMockApi) {
      console.log('✅ Using MOCK registration');
      return await mockRegister(name, email, password);
    }

    console.log('Using real backend at:', API_BASE_URL);
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
