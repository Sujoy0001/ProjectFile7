import React from "react";

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
            src="data:image/png;base64,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"
            alt="Logo"
            className="w-32 sm:mx-auto"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, ab cum doloribus aut rerum velit.
          </p>

          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <a
              href="javascript:void(0)"
              className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              View my work
            </a>
            <a
              href="javascript:void(0)"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
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
