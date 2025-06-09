import React from 'react'
import { Link } from 'react-router-dom'

const NotLogin = () => {
  return (
     <> 
        <marquee behavior="" direction="">Welcome To Our Platform</marquee>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center font-sans">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

            <div className="flex items-center justify-center gap-3 text-5xl font-bold mb-6">
              <span className="text-blue-600">&lt;/&gt;</span>
              <span className="text-gray-800">Community<span className="text-blue-600">APP</span></span>
            </div>

           
            <p className="text-gray-600 text-lg mb-8">
              This app is <span className="font-semibold">not free</span>. You must have an account to access the platform.
            </p>

            <div className="flex justify-center gap-6">
              <Link to="/signin">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-md font-medium hover:bg-blue-700 transition">
                Login
              </button>
              </Link>
              <Link to="/signup">
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-md font-medium hover:bg-gray-300 transition">
                Signup
              </button>
              </Link>
            </div>
          </div>
        </div>
        </>
  )
}

export default NotLogin