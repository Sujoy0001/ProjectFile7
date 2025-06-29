import React, { useState, useEffect } from "react";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import qrimg from "../assets/images/qrcode.jpg"

export default function QrPopupImage() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  // Close popup when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closePopup();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when popup is open
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center z-60">
      <button
        onClick={openPopup}
        className="flex justify-center items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer shadow-lg hover:shadow-xl active:shadow-md"
      >
        <QrCodeIcon className="h-6 w-6 text-gray-100 mx-auto" />
        Show QR
      </button>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Scan QR Code
            </h2>
            <div className="flex justify-center">
              <img
                src={qrimg}
                alt="QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm mt-4 text-center">
              Scan this QR code with your device's camera
            </p>
            <button
              onClick={closePopup}
              className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}