import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const collegeWorkStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    uploadImage: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/collegeWork/upload`,
                formData,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false });
                console.log("from store", response.data.data);
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    deleteImage: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/collegeWork/delete/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    editImage: async (id, formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/collegeWork/edit/${id}`,
                formData,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false });
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    },
    collegeWorkTitle: null,
    setCollegeWorkTitle: async (title) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/collegeWork/title/${title}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false, collegeWorkTitle: response.data.data });
                console.log("from store", response.data.data);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    }
}))

export default collegeWorkStore