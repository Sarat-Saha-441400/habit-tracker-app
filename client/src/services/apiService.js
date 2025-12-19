import axios from 'axios';

// 1. Define the base URL for your backend server
// Assuming your backend is running on http://localhost:5000
const API_BASE_URL = 'https://habit-tracker-sarat1.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Include cookies in requests if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Add an interceptor to inject the auth token into every request
// This ensures that authenticated endpoints receive the JWT token.
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        
        // If a token exists, set the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Optional: Add a response interceptor to handle token expiration/401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: If token is expired or unauthorized
        if (error.response && error.response.status === 401) {
            // This is where you might automatically call the logout function
            // To avoid circular dependencies, it's often better to handle 401
            // errors in the component or context that receives the error.
        }
        return Promise.reject(error);
    }
);

export default api;