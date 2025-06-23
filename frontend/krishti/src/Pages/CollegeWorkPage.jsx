import React, { useState } from "react";
import { useParams } from "react-router-dom";

const workData = {
  model: {
    title: "Model Making",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuduvQpAWlhmbMViE0BSSktkQMJuLUmuHKyw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKQt5uDsBudAMO266vu2rXELCrhaUy2EPYrw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3m3jw_n-bN2RIBUWwaJgDWHU43iJR84kmA&s",
    ],
  },
  "sand-art": {
    title: "Sand Art",
    images: ["/images/sand1.jpg", "/images/sand2.jpg"],
  },
  others: {
    title: "Others",
    images: ["/images/other1.jpg", "/images/other2.jpg", "/images/other3.jpg"],
  },
};

export default function CollegeWorkPage() {
  const { category } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const data = workData[category];

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-500">
          Category not found
        </h2>
      </div>
    );
  }

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("modal-close")
    ) {
      setSelectedImage(null);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-10">{data.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.images.map((src, idx) => (
          <div
            key={idx}
            className="relative group cursor-pointer"
            onClick={() => openModal(src)}
          >
            <img
              src={src}
              alt={`${data.title} ${idx + 1}`}
              className="w-full h-64 object-cover rounded shadow transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-lg truncate bg-gray-700 p-2 rounded-b-md opacity-80">
                {data.title} #{idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            {/* Top header with title and close */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {data.title} - Image {data.images.indexOf(selectedImage) + 1}
              </h2>
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="text-gray-900 hover:text-red-500 transition text-3xl pointer-coarse:pointer modal-close"
              >
                &times;
              </button>
            </div>

            {/* Image container */}
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Selected"
                className="mx-auto max-h-[75vh] w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
