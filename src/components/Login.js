import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, clearError } from '../redux/authSlice';
import { Mail, Lock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/authApi';

export default function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (!email || !password) {
      const msg = 'Please fill in all fields';
      dispatch(loginFailure(msg));
      toast.error(msg);
      return;
    }

    dispatch(loginStart());
    
    try {
      const result = await loginUser(email, password);
      console.log('Login result:', result);
      
      if (result.success) {
        // Login successful
        dispatch(
          loginSuccess({
            user: result.data.user,
            token: result.data.token,
          })
        );
        toast.success(`Welcome back, ${result.data.user.name || 'User'}!`);
      } else {
        // Login failed
        const errorMsg = result.message || 'Login failed. Please try again.';
        console.log('Login error:', errorMsg);
        dispatch(loginFailure(errorMsg));
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error('Login exception:', err);
      const errorMsg = err.message || 'An unexpected error occurred. Please try again.';
      dispatch(loginFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">FaceForward</h1>
          </div>
          <p className="text-gray-600">Welcome back</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-sm text-gray-500">or</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
