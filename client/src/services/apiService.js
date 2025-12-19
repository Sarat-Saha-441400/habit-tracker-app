import axios from 'axios';

const API_BASE_URL = 'https://habit-tracker-sarat1.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // Only add header if token actually exists and is not a string "null"
        if (token && token !== 'null' && token !== 'undefined') {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Clean up header if no token is found
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;