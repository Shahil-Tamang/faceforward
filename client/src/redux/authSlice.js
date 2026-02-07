import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../services/authApi';
import { toast } from 'react-hot-toast';

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiLoginUser(email, password);
      if (response.success) {
        toast.success(`Welcome back, ${response.data.user.name}!`);
        return response.data;
      } else {
        toast.error(response.message);
        return rejectWithValue(response.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await apiRegisterUser(name, email, password);
      if (response.success) {
        toast.success('Account created! Please log in.');
        return response.data;
      } else {
        toast.error(response.message);
        return rejectWithValue(response.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        // Do not log in automatically on signup success
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, stopLoading } = authSlice.actions;
export default authSlice.reducer;
