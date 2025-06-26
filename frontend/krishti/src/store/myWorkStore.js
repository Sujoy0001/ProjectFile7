import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const myWorkStore = create((set) => ({
    isLoading: false,
    error: null,
    message: null,
    uploadImage : async (formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/myWork/upload`,
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
                `${import.meta.env.VITE_BACKEND_URL}/myWork/delete/${id}`,
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
    editImage : async (id, formData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/myWork/edit/${id}`,
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
    myWorkTitle : null,
    setMyWorkTitle: async (title) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/myWork/title/${title}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                set({ isLoading: false, myWorkTitle: response.data.data });
                console.log("from store", response.data.data);
                handleSuccess(response.data.message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || error.message);
            set({ isLoading: false, error: error.message });
            throw error;
        }
    }
}))

export default myWorkStore