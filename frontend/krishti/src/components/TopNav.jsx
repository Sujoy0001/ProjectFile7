import React from "react";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between text-gray-600">
        
        <div className="flex items-center gap-3">
          <Link to={"/"}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfa-D_apj9tTVQ7lAirYL2Fg0bh_iFUeFgw&s"
            alt="Logo"
            className="h-12 w-12 rounded-full"  // Increased logo size
          /></Link>
        </div>

        <div className="text-2xl font-bold tracking-wide text-center">  {/* Increased to text-2xl */}
          krishti
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="block py-3 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"  // Enhanced button styling
          >
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
}