import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      url: "/",
      icon: (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "My Work",
      icon: (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      subItems: [
        { name: "Design", url: "/my-work/design", icon: "🎨" },
        { name: "Logo Design", url: "/my-work/logo-design", icon: "🖌️" },
        { name: "Mask Making", url: "/my-work/mask-making", icon: "🎭" },
        { name: "Book Cover", url: "/my-work/book-cover", icon: "🏖️" },
        { name: "Others", url: "/my-work/others", icon: "🧩" },
      ],
    },
    {
      name: "College Work",
      icon: (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      subItems: [
        { name: "Model Making", url: "/college-work/model", icon: "🎨" },
        { name: "Sand Art", url: "/college-work/sand-art", icon: "🏖️" },
        { name: "Others", url: "/college-work/others", icon: "🧩" },
      ],
    },
    {
      name: "About Me",
      url: "/about",
      icon: (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "Contact Me",
      url: "/contact",
      icon: (
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const dropdownWithActive = navItems.find(
      (item) =>
        item.subItems &&
        item.subItems.some((sub) => sub.url === location.pathname)
    );
    setActiveDropdown(dropdownWithActive?.name || null);
  }, [location.pathname]);

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-3 md:py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile menu button */}
        <div className="flex justify-between items-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center relative" ref={dropdownRef}>
          <div className="flex space-x-4 lg:space-x-8">
            {navItems.map((item, index) => {
              const isActiveParent =
                item.url === location.pathname ||
                (item.subItems &&
                  item.subItems.some((sub) => sub.url === location.pathname));

              return (
                <div key={index} className="relative">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center px-3 py-2 text-base lg:text-lg font-medium transition-colors ${
                          isActiveParent || activeDropdown === item.name
                            ? "text-yellow-500 font-semibold"
                            : "text-gray-700 hover:text-blue-500"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                        <svg
                          className={`w-4 h-4 ml-1 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 sm:w-56 md:w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 py-3">
                          <h3 className="px-4 py-2 text-xs sm:text-lg font-bold text-gray-500 uppercase tracking-wider">
                            {item.name}
                          </h3>
                          <div className="grid grid-cols-1 gap-1 px-2 py-1">
                            {item.subItems.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.url}
                                onClick={() => {
                                  setTimeout(() => setActiveDropdown(null), 100);
                                }}
                                className={`flex items-center px-3 py-2 text-sm sm:text-lg font-medium rounded transition-colors ${
                                  location.pathname === subItem.url
                                    ? "text-yellow-500 bg-yellow-50"
                                    : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                                }`}
                              >
                                <span className="mr-2">{subItem.icon}</span>
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.url}
                      className={`flex items-center px-3 py-2 text-base lg:text-lg font-medium transition-colors ${
                        location.pathname === item.url
                          ? "text-yellow-500"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1" ref={dropdownRef}>
            {navItems.map((item, index) => {
              const isActiveParent =
                item.url === location.pathname ||
                (item.subItems &&
                  item.subItems.some((sub) => sub.url === location.pathname));

              return (
                <div key={index} className="relative">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center w-full px-3 py-3 text-base font-medium rounded-md transition-colors ${
                          isActiveParent || activeDropdown === item.name
                            ? "text-yellow-500 bg-yellow-50"
                            : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                        <svg
                          className={`w-4 h-4 ml-1 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {activeDropdown === item.name && (
                        <div className="pl-6 py-2 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.url}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setTimeout(() => setActiveDropdown(null), 100);
                              }}
                              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                                location.pathname === subItem.url
                                  ? "text-yellow-500 bg-yellow-50"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              <span className="mr-2">{subItem.icon}</span>
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors ${
                        location.pathname === item.url
                          ? "text-yellow-500 bg-yellow-50"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}