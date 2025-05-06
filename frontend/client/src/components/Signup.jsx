import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen bg-[#121212] text-white">
      {/* Left Form Section */}
      <div className="flex w-full flex-col md:w-1/2 justify-center px-8 py-5">
        <div className="mb-10 md:pl-8">
          <a
            href="#"
            className="text-2xl font-bold text-white border-b-4 border-white pb-1"
          >
            Nexora
          </a>
        </div>

        <div className="lg:w-[28rem] mx-auto">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">CREATE AN ACCOUNT</h2>
          <p className="text-gray-400 mb-6">Fill in the details below to get started.</p>

          {error && (
            <div className="bg-red-600 text-white text-sm p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full max-w-md p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
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
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <a href="/login" className="ml-1 font-semibold text-white hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1607014454379-c16a1020535d?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="SignUp Visual"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] grayscale"
        />
        <div className="absolute bottom-0 z-10 p-8 text-white bg-gradient-to-t from-black via-transparent to-transparent">
          <p className="text-xl font-light tracking-wide mb-3 text-white">
            “Join us and start your journey today.”
          </p>
          <p className="font-medium">— Nexora</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
