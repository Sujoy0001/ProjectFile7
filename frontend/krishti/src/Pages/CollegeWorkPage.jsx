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
    images: [
      "/images/sand1.jpg",
      "/images/sand2.jpg",
    ],
  },
  others: {
    title: "Others",
    images: [
      "/images/other1.jpg",
      "/images/other2.jpg",
      "/images/other3.jpg",
    ],
  },
};

export default function CollegeWorkPage() {
  const { category } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const data = workData[category];

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-500">Category not found</h2>
      </div>
    );
  }

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('modal-close')) {
      setSelectedImage(null);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">{data.title}</h1>
      
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
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative">
            <button 
              className="modal-close absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-600 transition-colors"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="p-4">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[70vh] object-contain rounded"
              />
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-b-lg border-t border-gray-200 text-center">
              <p className="text-gray-700 font-medium">
                {data.title} - Image {data.images.indexOf(selectedImage) + 1}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}