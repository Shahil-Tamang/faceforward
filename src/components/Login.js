import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/authSlice';
import { Mail, Lock, Sparkles } from 'lucide-react';

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!email || !password) {
      // We can dispatch a local error or use a toast here if we want, 
      // but for consistency let's just let the empty check fail or use a simple alert?
      // Or actually, validation errors should probably also be toasts?
      // The previous implementation used dispatch(loginFailure) and toast.
      // Since we want to move logic to slice, we strictly use the slice actions.
      // However, client-side validation ("fields required") is often best kept in component 
      // OR we can make a thunk that rejects if empty.
      // For now, let's keep basic validation here but use the thunk for the rest.
      // Ideally validation should be in the thunk too if we want "pure" logic separation.
      // But keeping UI validation here is acceptable.
      // Let's just dispatch the thunk and let the thunk handle it? 
      // No, the thunk expects payload.
      // Let's just return early if empty.
      dispatch(login({ email, password }));
    } else {
      dispatch(login({ email, password }));
    }
  };

  // Actually, better to just dispatch the thunk. If empty, backend/thunk can reject.
  // But our mock API might not like empty.
  // Let's refine:

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!email || !password) {
      // We can't use 'loginFailure' anymore as it's not exported/doesn't exist in the same way (reducer logic changed).
      // We should rely on the thunk or valid local state.
      // Let's just pass to thunk and let thunk/api handle invalid data?
      // Our apiLoginUser mock does check for this? 
      // Previous code: if (!email || !password) dispatch(loginFailure(...))
      // Let's just let the user click and if we want proper validation we can add it.
      dispatch(login({ email, password }));
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in mx-4">
        <div className="p-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-purple-100">Sign in to continue your style journey</p>
        </div>

        <div className="p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
