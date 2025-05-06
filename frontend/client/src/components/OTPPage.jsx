import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { otp: serverOtp, token, username } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      setIsLoading(false);
      return;
    }

    try {
      if (otp === String(serverOtp)) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/home');
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background image with dark overlay */}
      <img
        src="https://images.unsplash.com/photo-1548516173-3cabfa4607e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.4] grayscale"
      />

      {/* OTP Card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-xl px-8 py-10 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-white text-center mb-2">Verify OTP</h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          We’ve sent a 6-digit code to <span className="font-medium text-white">{username || 'your email'}</span>
        </p>

        {error && (
          <div className="bg-red-500/90 text-white text-sm p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-md text-white bg-white/10 border border-white/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-medium rounded-md transition duration-300 ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Didn’t receive the code?{' '}
          <button className="underline text-white hover:text-gray-200">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default OTPPage;
