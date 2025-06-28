import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myWorkStore from "../store/myWorkStore.js";
import { formatName } from "../constant/constant.js";
import ErrorImg from "../assets/images/BkQxD7wtnZ.gif";
import Masonry from "react-masonry-css";

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


    <Masonry
      breakpointCols={{ default: 3, 1024: 2, 640: 1 }} // Responsive columns
      className="flex gap-4 md:gap-4 lg:gap-4 mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 py-4" // Increased gap, added max-width and padding
      columnClassName="bg-clip-padding" // Standard for Masonry
    >
      {myWorkTitle.map((val, idx) => (
        <div
          key={val._id}
          className="group relative mb-6 overflow-hidden rounded shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]" // Enhanced card styling with hover effects
          onClick={() => openModal(val)}
        >
          {/* Image with overlay effect */}
          <img
            src={val.image.url}
            alt={val.image.description || `Image ${idx + 1}`}
            className="w-full h-auto object-cover rounded transition-all duration-300 group-hover:opacity-80" // Image Opacity on hover
          />

          {/* Text Overlay for better presentation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-end p-4">
            <div className="text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-1 text-amber-300 italic">
                {formatName(val.title)}
              </h3>
              <span className="text-xs md:text-sm opacity-70 mt-1 block text-amber-100 font-bold italic">
                Work #{idx + 1}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Masonry>


      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 relative"
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

            <div className="flex flex-col max-h-[80vh] overflow-y-auto">
              <div className="flex-1 p-4">
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
