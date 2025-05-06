import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const { otp, token, username: uname } = response.data;

      navigate('/otp', {
        state: { otp, token, username: uname },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
<div className="flex flex-wrap min-h-screen bg-[#121212] text-white">
  {/* Left Form Section */}
  <div className="flex w-full flex-col md:w-1/2 justify-center px-8 py-12">
    <div className="mb-10 md:pl-8">
      <a
        href="#"
        className="text-2xl font-bold text-white border-b-4 border-white pb-1"
      >
        Nexora
      </a>
    </div>

    <div className="lg:w-[28rem] mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-white">Welcome back</h2>
      <p className="text-gray-400 mb-6">Please enter your credentials to continue.</p>

      {error && (
        <div className="bg-red-600 text-white text-sm p-3 rounded-lg mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md font-semibold transition ${
            isLoading
              ? 'bg-[#333333] cursor-not-allowed'
              : 'bg-white text-black hover:bg-[#eaeaea]'
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?
        <a href="/signup" className="ml-1 font-semibold text-white hover:underline">
          Sign up for free
        </a>
      </p>
    </div>
  </div>

  {/* Right Image Section */}
  <div className="hidden md:block md:w-1/2 relative">
    <img
      src="https://images.unsplash.com/photo-1460551882935-745bdcaf8009?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Login Visual"
      className="absolute inset-0 w-full h-full object-cover brightness-[0.5] grayscale"
    />
    <div className="absolute bottom-0 z-10 p-8 text-white bg-gradient-to-t from-black via-transparent to-transparent">
      <p className="text-xl font-semibold mb-3 text-white">
        “We work 10x faster than competitors, while they’re stuck in debt.”
      </p>
      <p className="font-medium">John Elmond</p>
      <p className="text-sm opacity-80">Founder, Emogue</p>
    </div>
  </div>
</div>

  
  );
};

export default Login;
