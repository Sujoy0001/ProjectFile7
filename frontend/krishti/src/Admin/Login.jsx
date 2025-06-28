// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import userStore from '../store/userStore.js'

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { fetchAuth, loginUser, logoutUser, error: loginError } = userStore();

  useEffect(() => {
    fetchAuth();

  }, [fetchAuth]);


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  const { username, password } = credentials;

  if (!username || !password) {
    setError('Username and password are required');
    setIsLoading(false);
    return;
  }

  const data = {
    email: username,
    password: password,
  };

  try {
    await loginUser(data); // will throw if login fails
    navigate('/dashboard');
  } catch (err) {
    setError(err?.response?.data?.message || 'Invalid username or password');
    setCredentials((prev) => ({ ...prev, password: '' }));
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-blue-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <LockClosedIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500">Sign in to your dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={credentials.username}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (
              <div 
                className="flex items-center justify-center space-x-2"
                role="status"
                aria-live="polite"
                aria-label="Signing in"
              >
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-white font-medium">Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
