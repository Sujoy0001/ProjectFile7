import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import gif404 from "../assets/images/gif404.gif";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-800 px-4 py-12 sm:px-6 lg:px-8">

      {/* GIF Animation */}
      <img 
        src={gif404} 
        alt="404 Animation"
        className="w-60 sm:w-72 md:w-80 lg:w-96 mb-8"
      />

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-center">
        404 - Page Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-500 text-base sm:text-lg md:text-xl text-center max-w-xl mb-8">
        Uh-oh! Looks like you're lost in the Stone Age. The page you’re looking for doesn’t exist.
      </p>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-semibold sm:text-lg transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <BiHomeAlt className="mr-2 text-xl font-bold" />
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
