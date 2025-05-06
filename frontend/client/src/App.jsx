import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import OTPPage from "./components/OTPPage";
import Home from "./components/Home";
import Dashboard from "./Dashboard/Dashboard";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/home" />; // Redirect to home if no token found
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OTPPage />} />
        
        {/* Protected Route for Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
