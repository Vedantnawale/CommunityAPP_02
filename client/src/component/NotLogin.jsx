import React from 'react';
import { Link } from 'react-router-dom';

const NotLogin = () => {
  return (
    <>
      <marquee behavior="" direction="" className="text-blue-700 font-semibold text-sm sm:text-base md:text-lg py-2">
        Welcome To Our Platform
      </marquee>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md sm:max-w-lg text-center">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-blue-600">&lt;/&gt;</span>
            <span className="text-gray-800">
              Community<span className="text-blue-600">APP</span>
            </span>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
            This app is <span className="font-semibold">total free</span>. You just have an account to access the platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/signin">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm sm:text-md font-medium hover:bg-blue-700 transition w-full sm:w-auto">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-sm sm:text-md font-medium hover:bg-gray-300 transition w-full sm:w-auto">
                Signup
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default NotLogin;
