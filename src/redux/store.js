import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import subscriptionReducer from './subscriptionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
  },
});
