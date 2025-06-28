import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logos/logo.png';
import { FaPhoneAlt } from "react-icons/fa";
import QrPopupImage from "./QrPopupImage";

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

        <div className="text-xl hidden md:block md:text-3xl font-bold tracking-wide text-center text-[#E97451]">  {/* Responsive text size */}
          KRISHTI
        </div>

        <div className="flex items-center">
          <QrPopupImage />  {/* QR Code Popup */}
        </div>
        </div>
    </nav>
  );
}