// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <div className="font-sans overflow-hidden">
//       {/* Hero Section */}
//       <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
//         {/* Using placeholder image instead of external URL */}
//         <img
//           src="https://images.unsplash.com/photo-1556086247-43384fc52f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Hero"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
       
//         {/* Gradient overlay instead of single color opacity */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

//         {/* Navbar */}
//         <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
//           <div className="text-white text-2xl font-light tracking-wide">Nexora</div>
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="text-white border border-white/30 px-4 py-2 rounded-md hover:bg-white/10 transition-all duration-300"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className="text-white border border-white/30 px-4 py-2 rounded-md hover:bg-white/10 transition-all duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Hero Content */}
//         <div className="relative z-10 text-center text-white px-4 transform transition-all duration-700 ease-out">
//           <h1 className="text-6xl sm:text-7xl font-light tracking-wide mb-6 drop-shadow-lg">Nexora</h1>
//           <p className="text-xl sm:text-2xl font-extralight mb-10 max-w-2xl mx-auto drop-shadow-md">
//             Intelligent IoT Infrastructure for the Smart World
//           </p>
//           <div className="mt-8">
//             {isLoggedIn ? (
//               <Link
//                 to="/dashboard"
//                 className="bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 shadow-lg"
//               >
//                 Go to Dashboard
//               </Link>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 shadow-lg"
//               >
//                 Get Started
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* About Section with subtle animation */}
//       <section className="bg-white text-gray-800 py-24 px-6 sm:px-16 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl sm:text-5xl font-light mb-8">Empowering Smart Environments</h2>
//           <div className="w-16 h-1 bg-gray-400 mx-auto mb-10"></div>
//           <p className="max-w-3xl mx-auto text-lg sm:text-xl font-extralight leading-relaxed">
//             Nexora is at the forefront of intelligent IoT integration. We help businesses monitor,
//             control, and automate their devices and environments effortlessly—securely and at scale.
//           </p>
//         </div>
//       </section>

//       {/* Split Section with improved layout */}
//       <section className="bg-[#f9f7f3] text-gray-800 py-0">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
//           {/* Left - Image */}
//           <div className="w-full md:w-1/2 h-[200px] md:h-auto">
//             <img
//               src="https://images.unsplash.com/photo-1589079821116-d34573188e4e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//               alt="Craftsmanship"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Right - Text */}
//           <div className="w-full md:w-1/2 p-12 md:p-16 lg:p-20 flex flex-col justify-center">
//             <h3 className="text-3xl sm:text-4xl font-light mb-6 leading-snug">
//               A celebration of the highest standards of craftsmanship
//             </h3>
//             <div className="w-16 h-1 bg-gray-400 mb-8"></div>
//             <p className="text-gray-600 text-lg font-extralight mb-10">
//               An extraordinary experience in design—Nexora reflects a vision of seamless, secure
//               infrastructure guided by technical precision and aesthetic elegance.
//             </p>
//             <button className="self-start border border-gray-500 px-6 py-3 text-sm font-medium tracking-wider hover:bg-gray-100 transition-all duration-300 group">
//               <span className="flex items-center">
//                 EXPLORE 
//                 <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="font-sans overflow-hidden">
{/* Hero Section */}
<div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
  {/* Black and white image with proper loading optimization */}
  <img
    src="https://images.unsplash.com/photo-1556086247-43384fc52f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover filter grayscale"
    loading="eager"
  />
 
  {/* More sophisticated gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

  {/* Clean modern navbar */}
  <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-end items-center z-20">
    {isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="text-white border border-white/30 px-5 py-2 rounded-none hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider"
      >
        LOGOUT
      </button>
    ) : (
      <Link
        to="/login"
        className="text-white border border-white/30 px-5 py-2 rounded-none hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider"
      >
        LOGIN
      </Link>
    )}
  </div>

  {/* Creative title placement with overlapping elements */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
    <div className="relative">
      {/* Oversized background title */}
      <div className="absolute -top-24 md:-top-32 left-0 w-full opacity-10 pointer-events-none">
        <h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-extralight text-white tracking-tight leading-none">
          NEXORA
        </h1>
      </div>
      
      {/* Main content */}
      <div className="relative ml-4 md:ml-12 pt-12">
        {/* Vertical line */}
        <div className="absolute top-0 left-0 w-px h-full bg-white/20"></div>
        
        {/* Title with creative placement */}
        <div className="mb-12 md:mb-16 relative">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-px bg-white"></div>
          <h2 className="text-6xl md:text-7xl font-light text-white tracking-wide ml-8">
            NEXORA
          </h2>
        </div>
        
        {/* Subtitle with offset */}
        <div className="ml-8 md:ml-16 max-w-lg">
          <p className="text-lg md:text-xl font-extralight text-white/90 tracking-wide mb-12">
            INTELLIGENT IOT INFRASTRUCTURE FOR THE SMART WORLD
          </p>
          
          <div>
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="group relative inline-block overflow-hidden border border-white px-8 py-4"
              >
                <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative text-white text-sm tracking-widest font-light transition-colors duration-300 group-hover:text-black">
                  GO TO DASHBOARD
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="group relative inline-block overflow-hidden border border-white px-8 py-4"
              >
                <span className="absolute inset-0 bg-white translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                <span className="relative text-white text-sm tracking-widest font-light transition-colors duration-300 group-hover:text-black">
                  GET STARTED
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
    <span className="text-white/70 text-xs tracking-widest mb-2">SCROLL</span>
    <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</div>
      {/* About Section with subtle animation */}
      <section className="bg-white text-gray-800 py-24 px-6 sm:px-16 text-center min-h-screen">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-light mb-8">Empowering Smart Environments</h2>
    <div className="w-16 h-1 bg-gray-400 mx-auto mb-10"></div>
    <p className="max-w-3xl mx-auto text-lg sm:text-xl font-extralight leading-relaxed">
      Nexora is at the forefront of intelligent IoT integration. We help businesses monitor,
      control, and automate their devices and environments effortlessly—securely and at scale.
    </p>
  </div>

  {/* Image Section */}
  <div className="mt-16">
    <img
      src="https://images.unsplash.com/photo-1644372863353-27ecab2805db?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Smart IoT Environment"
      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg object-cover"
    />
  </div>
</section>

      {/* Split Section with improved layout */}
      <section className="bg-[#f9f7f3] text-gray-800 py-0 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
          {/* Left - Image */}
          <div className="w-full md:w-1/2 h-[200px] md:h-auto pt-27">
            <img
              src="https://images.unsplash.com/photo-1589079821116-d34573188e4e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right - Text */}
          <div className="w-full md:w-1/2 p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl font-light mb-6 leading-snug">
              A celebration of the highest standards of craftsmanship
            </h3>
            <div className="w-16 h-1 bg-gray-400 mb-8"></div>
            <p className="text-gray-600 text-lg font-extralight mb-10">
              An extraordinary experience in design—Nexora reflects a vision of seamless, secure
              infrastructure guided by technical precision and aesthetic elegance.
            </p>
            <button className="self-start border border-gray-500 px-6 py-3 text-sm font-medium tracking-wider hover:bg-gray-100 transition-all duration-300 group">
              <span className="flex items-center">
                EXPLORE 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;