import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeLeft = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/firstpage');
  };

  return (
    <div className="flex flex-col items-start justify-center h-full p-8 text-left animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
        Welcome to <span className="text-blue-500">CommunityApp</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
        Discover a world of ideas, projects, and connections. It's free, practical, and powered by people like you. Join a thriving community shaping the future.
      </p>
      <button
        onClick={handleExplore}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition duration-300"
      >
        🚀 Free Explore Now
      </button>
    </div>
  );
};

export default HomeLeft;
