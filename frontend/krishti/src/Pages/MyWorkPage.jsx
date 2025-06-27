import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myWorkStore from "../store/myWorkStore.js";
import { formatName } from "../constant/constant.js";
import ErrorImg from "../assets/images/BkQxD7wtnZ.gif"; // Ensure correct path

export default function MyWorkPage() {
  const { category } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    myWorkTitle,
    setMyWorkTitle,
    isLoading,
    error,
  } = myWorkStore();

  useEffect(() => {
    setMyWorkTitle(category);
  }, [category, setMyWorkTitle]);

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.closest(".close-button")) {
      setSelectedItem(null);
      document.body.style.overflow = "auto";
    }
  };

  // Debug logs
  console.log("myWorkTitle:", myWorkTitle);
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("category:", category);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold text-gray-700">
        Loading, please wait...
      </div>
    );
  }

  if (error || !myWorkTitle || myWorkTitle.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-red-500 font-semibold">
        <img
          src={ErrorImg}
          alt="No image found"
          className="w-auto h-70 mb-4"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        {formatName(category)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {myWorkTitle.map((val, idx) => (
          <div
            key={val._id}
            className="group relative w-full h-72 overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => openModal(val)}
          >
            <img
              src={val.image.url}
              alt={val.image.description || `Image ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-lg truncate">
                {formatName(val.title)} #{idx + 1}
              </span>
            </div>

            <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 relative flex flex-col max-h-screen h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {formatName(category)} - Image
              </h2>
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="text-gray-900 hover:text-red-500 transition text-4xl font-bold close-button cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="p-4">
                <img
                  src={selectedItem.image.url}
                  alt={selectedItem.image.description || "Selected"}
                  className="mx-auto max-h-[75vh] w-full object-contain rounded"
                />
              </div>

              <div className="p-2 border-t">
                {selectedItem.image.description && (
                  <p className="mt-0 text-gray-900 text-md italic">
                    {selectedItem.image.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
