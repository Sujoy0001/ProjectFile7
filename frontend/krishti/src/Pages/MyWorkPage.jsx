import React, { useState } from "react";
import { useParams } from "react-router-dom";

const myWorkData = {
  design: {
    title: "Design",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYP7khs068Pjdc7QJ2UfwiEHaV2tHiMe2kw&s",
      "https://preview.redd.it/this-random-nature-wallpaper-that-i-downloaded-always-makes-v0-b0jhskw3buz81.jpg?width=640&crop=smart&auto=webp&s=5536562f80bf51aaca0ec105f854eb8b712e040e",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLs3s44EpbX1pycKKG7cPrdPapaNmUzJ1Cow&s",
    ],
  },
  "logo-design": {
    title: "Logo Design",
    images: ["/images/logo1.jpg", "/images/logo2.jpg"],
  },
  "book-cover": {
    title: "Book Cover",
    images: ["/images/book1.jpg", "/images/book2.jpg"],
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

export default function MyWorkPage() {
  const { category } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const data = myWorkData[category];

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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.closest('.close-button')) {
      setSelectedImage(null);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">{data.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data.images.map((src, idx) => (
          <div
            key={idx}
            className="group relative w-full h-72 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
            onClick={() => openModal(src)}
          >
            <img
              src={src}
              alt={`${data.title} ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-lg truncate">
                {data.title} #{idx + 1}
              </span>
            </div>
            
            <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal (not full screen) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-opacity-90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full relative">
            <button 
              className="close-button absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="p-2">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 rounded-b-xl border-t border-gray-200">
              <p className="text-center text-gray-700 font-medium">
                {data.title} - Image {data.images.indexOf(selectedImage) + 1}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}