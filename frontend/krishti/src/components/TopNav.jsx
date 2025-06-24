import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logos/logo.png';
import { FaPhoneAlt  } from "react-icons/fa";

export default function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-gray-600">
        
        <div className="flex items-center gap-3">
          <Link to={"/"}>
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto rounded-full"  // Increased logo size
          /></Link>
        </div>

        <div className="text-3xl font-bold tracking-wide text-center">  {/* Increased to text-2xl */}
          KRISHTI
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="flex items-center justify-center  py-3 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-md hover:shadow-none"  // Enhanced button styling
          >
            <FaPhoneAlt  className="inline mr-2" />
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
}