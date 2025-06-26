import { create } from "zustand";
import { handleError, handleSuccess } from "../components/ErrorMessage";
import axios from "axios";

const userStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    fetchAuth: async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/current`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ user: response.data.data, isAuthenticated: true });
                console.log("from store", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            // handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },
    registerUser : async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/register`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // set({ isLoading: false, user: data.data.user, isAuthenticated: true });
                console.log("from store", response.data.data);
                // handleSuccess(response.data.message);
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            // handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },
    loginUser: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/login`,
                credentials,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                set({ isLoading: false, user: response.data.data, isAuthenticated: true });
                console.log("from store", response.data);
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },
    logoutUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                set({ user: null, isAuthenticated: false });
                console.log("from store", response.data);
                // handleSuccess(response.data.message);
            }
        } catch (error) {
            set({ isLoading: false, error: error.message });
            // handleError(error.response?.data?.message || error.message);
            throw error;
        }
    },
}))

export default userStore