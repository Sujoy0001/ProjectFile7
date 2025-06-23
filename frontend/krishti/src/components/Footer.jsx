import React from "react";
import logo from "../assets/logos/logo.png"; // Adjust the path as necessary

export default function Footer() {
  const footerNavs = [
    { href: "javascript:void(0)", name: "Terms" },
    { href: "javascript:void(0)", name: "License" },
    { href: "javascript:void(0)", name: "Privacy" },
    { href: "javascript:void(0)", name: "About us" },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-32 sm:mx-auto"
          />
          <p className="font-semibold text-2xl sm:text-lg text-gray-800 italic">
            Creativity is my passion. I want to involve myself in the creation of uncommon design and craft.
          </p>

          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <a
              href="/my-work/design"
              className="block py-3 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              View my work
            </a>
            <a
              href="javascript:void(0)"
              className="flex items-center justify-center gap-x-2 py-3 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
            >
              View Blog's
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>© {new Date().getFullYear()} Sujoy garai. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li key={idx} className="text-gray-800 hover:text-gray-500 duration-150">
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
