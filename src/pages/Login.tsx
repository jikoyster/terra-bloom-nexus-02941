// src/pages/Login.tsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../models/userModel';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ Supabase login using credentials from Auth table
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        // ✅ Save user locally (for session persistence)
        UserModel.saveUser(data.user);
        navigate('/dashboard');
      } else {
        setError('No user data found.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">      
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <center className="w-full">
        <a href='/'>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Terra<span className="text-green-600">Sync</span>
          </h1>
        </a>
        <small className="text-center mb-6">Please login to continue... </small>
        <br /><br />
      </center>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>
    </div>
  );
};

export default LoginPage;
