import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Community<span className="text-blue-600">App</span> By Vedant A. Nawale.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
