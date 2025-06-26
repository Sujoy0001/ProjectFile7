// src/pages/Dashboard.jsx
import React, { useState, useRef } from 'react';
import { FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const myWorkSubcats = ['Project', 'Art', 'Design', 'Poster', 'Other'];
  const collegeWorkSubcats = ['Assignment', 'Model', 'Event'];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size too large (max 5MB)');
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setUploadSuccess(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !category || !subcategory) {
      alert('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log({
        file,
        category,
        subcategory,
        description,
      });

      setUploadSuccess(true);
      setTimeout(() => {
        resetForm();
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setDescription('');
    setCategory('');
    setSubcategory('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border-2 border-gray-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Upload Your Work</h1>
            <p className="mt-2 text-gray-600">
              Share your projects, assignments, or creative works with the community
            </p>
          </div>

          {uploadSuccess ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900">Upload Successful!</h2>
              <p className="mt-1 text-gray-600">Your work has been successfully uploaded.</p>
              <button
                onClick={() => setUploadSuccess(false)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Upload Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <div className="relative">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="mx-auto max-h-60 rounded-md shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Tell us about your work..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubcategory('');
                    }}
                    required
                  >
                    <option value="">-- Select Category --</option>
                    <option value="mywork">My Work</option>
                    <option value="college">College Work</option>
                  </select>
                </div>

                {/* Subcategory */}
                {category && (
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                      Subcategory <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      required
                    >
                      <option value="">-- Select Subcategory --</option>
                      {(category === 'mywork' ? myWorkSubcats : collegeWorkSubcats).map((sub, idx) => (
                        <option key={idx} value={sub.toLowerCase()}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2 h-5 w-5" />
                      Upload Work
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        
      </div>
    </div>
  );
}