import React from "react";
import { useParams } from "react-router-dom";

const workData = {
  model: {
    title: "Model Making",
    images: [
      "/images/model1.jpg",
      "/images/model2.jpg",
      "/images/model3.jpg",
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
  const data = workData[category];

  if (!data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-500">Category not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">{data.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${data.title} ${idx + 1}`}
            className="w-full h-64 object-cover rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}
