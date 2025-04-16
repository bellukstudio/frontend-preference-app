import axios from 'axios';

const rawToken = localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + rawToken,
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(new Error(error.message || "Request Error"));
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError = new Error(error.message || 'Response error');
        customError.stack = error.stack;

        if (error.response && error.response.status === 401) {
            console.log("Unauthorized - Please log in again.");
        }

        return Promise.reject(customError);
    }
);

export default axiosInstance;
