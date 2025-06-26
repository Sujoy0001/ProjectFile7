import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiX, FiUpload, FiSearch, FiChevronDown } from "react-icons/fi";
import myWorkStore from "../store/myWorkStore.js";
import collegeWorkStore from "../store/collegeWorkStore.js";
import { handleError, handleSuccess } from "../components/ErrorMessage";

const Edit = () => {
  const categories = {
    "My Work": ["design", "logo_design", "mask_making", "book_cover", "other"],
    "College Work": ["model_making", "sand_art", "other"]
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [items, setItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);

  // Load data when subcategory is selected
  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedSubcategory) return;
      
      try {
        if (selectedCategory === "My Work") {
          await myWorkStore.getState().setMyWorkTitle(selectedSubcategory);
          const { myWorkTitle } = myWorkStore.getState();
          setItems(myWorkTitle ? myWorkTitle.map(item => ({
            id: item._id,
            name: `${selectedSubcategory} Item`,
            imageUrl: item.image?.url || '',
            description: item.image?.description || '',
            date: new Date(item.createdAt).toISOString().split('T')[0]
          })) : []);
        } else if (selectedCategory === "College Work") {
          await collegeWorkStore.getState().setCollegeWorkTitle(selectedSubcategory);
          const { collegeWorkTitle } = collegeWorkStore.getState();
          setItems(collegeWorkTitle ? collegeWorkTitle.map(item => ({
            id: item._id,
            name: `${selectedSubcategory} Item`,
            imageUrl: item.image?.url || '',
            description: item.image?.description || '',
            date: new Date(item.createdAt).toISOString().split('T')[0]
          })) : []);
        }
      } catch (error) {
        handleError(error.message);
        setItems([]); // Clear items on error
      }
    };

    fetchItems();
  }, [selectedSubcategory, selectedCategory]);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setNewDescription(item.description);
    setPreviewImage(item.imageUrl);
    setNewImage(null);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedCategory === "My Work") {
        await myWorkStore.getState().deleteImage(currentItem.id);
      } else {
        await collegeWorkStore.getState().deleteImage(currentItem.id);
      }
      setItems(items.filter(item => item.id !== currentItem.id));
      setShowDeleteModal(false);
      handleSuccess("Item deleted successfully");
    } catch (error) {
      handleError(error.message);
    }
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      if (newImage) {
        formData.append('image', newImage);
      }
      formData.append('description', newDescription);

      if (selectedCategory === "My Work") {
        await myWorkStore.getState().editImage(currentItem.id, formData);
      } else {
        await collegeWorkStore.getState().editImage(currentItem.id, formData);
      }

      // Update local state
      setItems(items.map(item => 
        item.id === currentItem.id 
          ? { 
              ...item, 
              description: newDescription,
              imageUrl: newImage ? URL.createObjectURL(newImage) : item.imageUrl
            } 
          : item
      ));
      
      setShowEditModal(false);
      handleSuccess("Changes saved successfully");
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const filteredItems = items.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading = 
    (selectedCategory === "My Work" && myWorkStore.getState().isLoading) ||
    (selectedCategory === "College Work" && collegeWorkStore.getState().isLoading);

  return (
    <div className={`min-h-screen py-8 px-4 ${(showEditModal || showDeleteModal) ? 'overflow-hidden' : ''}`}>
      {/* Blur overlay when modals are open */}
      {(showEditModal || showDeleteModal) && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"></div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Your Work</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 lg:gap-10 md:gap-10">
          {/* Category Selection */}
          <div className="mb-8">
            <div className="relative">
              <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className={`w-full sm:w-64 px-4 py-3 text-left flex items-center justify-between rounded-lg border ${
                selectedCategory ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <span>{selectedCategory || "Select Category"}</span>
              <FiChevronDown className={`transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                {Object.keys(categories).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubcategory(null);
                      setShowCategoryDropdown(false);
                      setShowSubcategoryDropdown(true);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      selectedCategory === category ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subcategory Selection */}
        {selectedCategory && (
          <div className="mb-8">
            <div className="relative">
              <button
                onClick={() => setShowSubcategoryDropdown(!showSubcategoryDropdown)}
                className={`w-full sm:w-64 px-4 py-3 text-left flex items-center justify-between rounded-lg border ${
                  selectedSubcategory ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <span>{selectedSubcategory || "Select Subcategory"}</span>
                <FiChevronDown className={`transition-transform ${showSubcategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSubcategoryDropdown && (
                <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                  {categories[selectedCategory].map(subcategory => (
                    <button
                      key={subcategory}
                      onClick={() => {
                        setSelectedSubcategory(subcategory);
                        setShowSubcategoryDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        selectedSubcategory === subcategory ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        </div>

        {/* Items Display */}
        {selectedSubcategory && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedSubcategory} Projects
                <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {filteredItems.length} items
                </span>
              </h2>
              <div className="relative w-full sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  {searchTerm ? "No projects found" : "No projects available"}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try a different search term" : "Create a new project to get started"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg text-gray-800 truncate">{item.name}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-2 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && currentItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-black/30 backdrop-blur">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Project</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Current Image</label>
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img 
                      src={previewImage} 
                      alt={currentItem.name} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Upload New Image</label>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    rows="5"
                    placeholder="Enter project description..."
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveEdit}
                    disabled={isLoading}
                    className={`px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md flex items-center ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && currentItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-5">
                  <FiTrash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete {currentItem.name}?</h3>
                <p className="text-gray-500 mb-6">
                  This will permanently delete the project and all its data. This action cannot be undone.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className={`px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md flex items-center ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : 'Delete Permanently'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;