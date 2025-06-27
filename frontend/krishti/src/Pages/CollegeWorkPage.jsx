import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import collegeWorkStore from "../store/collegeWorkStore";
import { formatName } from "../constant/constant.js";

export default function CollegeWorkPage() {
  const { category } = useParams();
  const [selectedItem, setSelectedItem] = useState(null); // store entire item

  const {
    setCollegeWorkTitle,
    collegeWorkTitle,
    isLoading,
    error,
  } = collegeWorkStore();

  useEffect(() => {
    setCollegeWorkTitle(category);
  }, [category, setCollegeWorkTitle]);

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("modal-close")
    ) {
      setSelectedItem(null);
      document.body.style.overflow = "auto";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">Loading...</div>
    );
  }

  if (error || !collegeWorkTitle || collegeWorkTitle.length === 0) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {"No images found for this category."}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        {formatName(category)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collegeWorkTitle.map((item, idx) => (
          <div
            key={item._id}
            className="relative group cursor-pointer"
            onClick={() => openModal(item)}
          >
            <img
              src={item.image.url}
              alt={item.image.description || `${item.title} ${idx + 1}`}
              className="w-full h-64 object-cover rounded shadow transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-lg truncate bg-gray-700 p-2 rounded-b-md opacity-80">
                {formatName(item.title)} #{idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

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
                className="text-gray-900 hover:text-red-500 transition text-4xl font-bold modal-close cursor-pointer"
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
