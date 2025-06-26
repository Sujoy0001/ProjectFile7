// src/components/AdminNavbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import PropTypes from "prop-types";
import logo from "../assets/logos/logo.png"; // Replace with your actual logo path

export default function AdminNavbar({ userName = "Admin" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    // In a real app: clear auth tokens and user data
    alert("Logged out successfully");
    navigate("/admin");
  };

  // Highlight current page
  const currentPath = location.pathname;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <RiDashboardFill className="text-lg" /> },
    { path: "/dashboard/edit", label: "Edit", icon: <FaEdit className="text-lg" /> },
  ];

  return (
    <nav className="bg-white border-b border-blue-100 shadow-sm px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo with image */}
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="ml-3 text-xl font-bold text-blue-800 italic hidden md:block">KRISHTI AdminPanel</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-50 text-blue-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FiMenu className="text-2xl" />
        </button>

        {/* Center: Links - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPath === item.path
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "text-blue-800 hover:bg-blue-50"
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Right: User Info + Logout */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-blue-800">
            <FaUserCircle className="text-2xl" />
            <span className="font-medium">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-all ${
                currentPath === item.path
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "text-blue-800 hover:bg-blue-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </div>
            </Link>
          ))}
          <div className="pt-2 border-t border-blue-100">
            <div className="flex items-center px-4 py-3 text-blue-800">
              <FaUserCircle className="text-xl" />
              <span className="ml-3">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-lg text-blue-800 hover:bg-blue-50"
            >
              <FiLogOut />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

AdminNavbar.propTypes = {
  userName: PropTypes.string,
};