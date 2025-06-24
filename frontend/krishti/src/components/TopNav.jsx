import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logos/logo.png';
import { FaPhoneAlt } from "react-icons/fa";

export default function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-2 md:py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-gray-600">
        
        <div className="flex items-center gap-2 md:gap-3">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-8 md:h-12 w-auto rounded-full"  // Responsive logo size
            />
          </Link>
        </div>

        <div className="text-xl hidden md:block md:text-3xl font-bold tracking-wide text-center">  {/* Responsive text size */}
          KRISHTI
        </div>

        <div className="flex items-center">
          <Link
            to="/contact"
            className="flex items-center justify-center py-3 px-4 md:py-3 md:px-4 text-sm md:text-base text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-md hover:shadow-none"  // Responsive padding and text size
          >
            <FaPhoneAlt className="inline mr-1 md:mr-2" />
            <span className="hidden sm:inline">Contact Me</span>  {/* Hide text on small screens */}
            <span className="sm:hidden">Contact</span>  {/* Shorter text on small screens */}
          </Link>
        </div>
      </div>
    </nav>
  );
}