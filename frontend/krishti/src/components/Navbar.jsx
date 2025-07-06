import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  ChevronDownIcon, 
  Bars3Icon,      
  XMarkIcon,     
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      url: "/",
      icon: <HomeIcon className="w-5 h-5 mr-1" />,
    },
    {
      name: "My Work",
      icon: <BriefcaseIcon className="w-5 h-5 mr-1" />,
      subItems: [
        { name: "Design", url: "/my-work/design", icon: "🎨" },
        { name: "Photoshop Work", url: "/my-work/photoshop_work", icon: "🖥" },
        { name: "Painting", url: "/my-work/painting", icon: "🖼️" },
        { name: "Fabric Painting", url: "/my-work/fabric_painting", icon: "👕" },
        { name: "Craft Work", url: "/my-work/craft_work", icon: "✂️" },
        { name: "Photography", url: "/my-work/photography", icon: "📸" },
        { name: "Lippan Art", url: "/my-work/others", icon: "𑁍" },
        { name: "Mandala Art", url: "/my-work/others", icon: "☸" },
        { name: "Quilling Art", url: "/my-work/others", icon: "🌀" },
        { name: "Others", url: "/my-work/others", icon: "🧩" },
      ],
    },
    {
      name: "College Work",
      icon: <AcademicCapIcon className="w-5 h-5 mr-1" />,
      subItems: [
        { name: "Painting", url: "/college-work/painting", icon: "🖼️" },
        { name: "Batik Work", url: "/college-work/batik_work", icon: "👚" },
        { name: "Pencil Sketch", url: "/college-work/pencil_sketch", icon: "✏️" },
        { name: "Screen Printing", url: "/college-work/screen_printing", icon: "🖨️" },
        { name: "Book Cover Design", url: "/college-work/book_cover_design", icon: "📚" },
        { name: "Mask Making", url: "/college-work/mask_making", icon: "🎭" },
        { name: "Logo Making", url: "/college-work/logo_making", icon: "💠" },
        { name: "Design", url: "/college-work/design", icon: "🎨" },
        { name: "Jute Bag Making", url: "/college-work/jute_bag_making", icon: "👜" },
        { name: "Glass Painting", url: "/college-work/glass_painting", icon: "🖼️" },
        { name: "Sand Art Design", url: "/college-work/sand_art_design", icon: "🏖️" },
        { name: "Tie Dye", url: "/college-work/tie_dye", icon: "👕" },
        { name: "Woodcut Painting", url: "/college-work/woodcut_painting", icon: "🪵" },
        { name: "Others", url: "/college-work/others", icon: "🧩" },
      ],
    },
    {
      name: "About Me",
      url: "/about",
      icon: <UserIcon className="w-5 h-5 mr-1" />,
    },
    {
      name: "Contact Me",
      url: "/contact",
      icon: <EnvelopeIcon className="w-5 h-5 mr-1" />,
    },
  ];

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !mobileMenuRef.current?.contains(event.target)
      ) {
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
  
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenuAndDropdown = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null); 
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center relative" ref={dropdownRef}>

         
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>

      
          <div className="hidden lg:flex space-x-8 m-auto">
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
                        className={`flex items-center px-3 py-2 text-lg font-semibold transition-colors rounded-md
                          ${
                            isActiveParent || activeDropdown === item.name
                              ? "text-yellow-500 font-semibold bg-yellow-50"
                              : "text-gray-700 hover:text-blue-500 hover:bg-blue-50" 
                          }`}
                      >
                        {item.icon}
                        {item.name}
                        <ChevronDownIcon
                          className={`w-4 h-4 ml-1 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max min-w-[200px] bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 py-3">
                          <h3 className="px-4 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                            {item.name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-3 py-2">
                            {item.subItems.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.url}
                                onClick={() => {
                                  setTimeout(() => setActiveDropdown(null), 100);
                                }}
                                className={`flex items-center px-3 py-2 text-base font-bold rounded transition-colors justify-start gap-2
                                  ${
                                    location.pathname === subItem.url
                                      ? "text-yellow-500 bg-yellow-50"
                                      : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                                  }`}
                              >
                                <span className="text-xl">{subItem.icon}</span> 
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
                      className={`flex items-center px-3 py-2 text-lg font-semibold transition-colors rounded-md
                        ${
                          location.pathname === item.url
                            ? "text-yellow-500 font-semibold bg-yellow-50"
                            : "text-gray-700 hover:text-blue-500 hover:bg-blue-50"
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

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center py-10 px-6 overflow-y-auto"
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2 transition-colors"
            aria-label="Close navigation menu"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <div className="mt-8 w-full">
            {navItems.map((item, index) => {
              const isActiveParent =
                item.url === location.pathname ||
                (item.subItems &&
                  item.subItems.some((sub) => sub.url === location.pathname));

              return (
                <div key={index} className="py-2 w-full text-center">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center justify-center w-full px-4 py-3 text-xl font-semibold transition-colors rounded-md
                          ${
                            isActiveParent || activeDropdown === item.name
                              ? "text-yellow-600 font-semibold bg-yellow-100"
                              : "text-gray-800 hover:text-blue-700 hover:bg-blue-50"
                          }`}
                      >
                        {item.icon}
                        {item.name}
                        <ChevronDownIcon
                          className={`w-5 h-5 ml-2 transition-transform ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="mt-2 w-full bg-gray-50 rounded-lg shadow-inner py-2 px-2">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.url}
                              onClick={closeMobileMenuAndDropdown} 
                              className={`flex items-center px-4 py-3 text-lg font-medium rounded transition-colors justify-center gap-2 mt-1
                                ${
                                  location.pathname === subItem.url
                                    ? "text-yellow-600 bg-yellow-200"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                                }`}
                            >
                              <span className="text-2xl">{subItem.icon}</span> 
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.url}
                      onClick={closeMobileMenuAndDropdown} 
                      className={`flex items-center justify-center w-full px-4 py-3 text-xl font-semibold transition-colors rounded-md
                        ${
                          location.pathname === item.url
                            ? "text-yellow-600 font-semibold bg-yellow-100"
                            : "text-gray-800 hover:text-blue-700 hover:bg-blue-50"
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
      )}
    </nav>
  );
}