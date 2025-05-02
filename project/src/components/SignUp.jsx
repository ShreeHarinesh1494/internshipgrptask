import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Register.css';

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        const data = {
            name,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', data);
            toast.success('Registration successful!');
            console.log('Registration Response:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <>
            <section className="bg-cover bg-center min-h-screen flex items-center justify-center pt-20">
                <div className="bg-white/30 backdrop-blur-lg flex rounded-2xl shadow-2xl max-w-3xl p-5 transform transition-transform duration-500 hover:scale-105">
                    <div className="md:w-1/2 hidden md:flex justify-center items-center">
                        <img className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300" src="https://abusix.com/wp-content/uploads/2024/06/4324868-18754_4be9a1b0dddc6b59a5fbcaf2ca214150_2000.jpeg" alt="Sign Up Visual" />
                    </div>
                    <div className="md:w-1/2 px-8 md:px-16 flex flex-col items-end">
                        <h2 className="font-bold text-3xl text-[#002D74] animate-bounce">Sign Up</h2>
                        <p className="text-sm mt-4 text-[#002D74]">Create a new account</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                            <input 
                                className="p-3 mt-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002D74] transition-all duration-300 text-black" 
                                type="text" 
                                name="name" 
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002D74] transition-all duration-300 text-black" 
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <input 
                                    className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-[#002D74] transition-all duration-300 text-black" 
                                    type={passwordVisible ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-eye absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300" viewBox="0 0 16 16" onClick={togglePasswordVisibility}>
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            <div className="relative">
                                <input 
                                    className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-[#002D74] transition-all duration-300 text-black" 
                                    type={confirmPasswordVisible ? "text" : "password"} 
                                    name="confirmPassword" 
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-eye absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300" viewBox="0 0 16 16" onClick={toggleConfirmPasswordVisibility}>
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:bg-[#001F5C] transition-colors duration-300" type="submit">Sign Up</button>
                        </form>
                        <div className="text-sm text-[#002D74] mt-4">
                            Already have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={handleLoginClick}>Login</span>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default SignUp;
