// src/pages/Dashboard.jsx
import React, { useState } from 'react';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [preview, setPreview] = useState(null);

  const myWorkSubcats = ['Project', 'Art', 'Design', 'Poster', 'Other'];
  const collegeWorkSubcats = ['Assignment', 'Model', 'Event'];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !category || !subcategory) {
      alert('Please fill all required fields.');
      return;
    }

    // Send file, category, subcategory, description to backend or state
    console.log({
      file,
      category,
      subcategory,
      description,
    });

    alert('Uploaded successfully!');
    // Reset
    setFile(null);
    setDescription('');
    setCategory('');
    setSubcategory('');
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Upload Your Work</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Choose Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 w-full rounded shadow" />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border px-3 py-2 rounded"
              placeholder="Write something..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Category *</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
              }}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="mywork">My Work</option>
              <option value="college">College Work</option>
            </select>
          </div>

          {category && (
            <div>
              <label className="block mb-1 font-medium">Subcategory *</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">-- Select Subcategory --</option>
                {(category === 'mywork' ? myWorkSubcats : collegeWorkSubcats).map((sub, idx) => (
                  <option key={idx} value={sub.toLowerCase()}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
