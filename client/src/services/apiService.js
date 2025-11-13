// client/src/services/apiService.js
import axios from 'axios';

// 1. Create a configured Axios instance
const api = axios.create({
    // In a React setup using create-react-app or Vite, this baseURL 
    // assumes you have configured a proxy in package.json to route requests 
    // from /api to your backend (e.g., http://localhost:5000/api).
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Request Interceptor: Attach Authorization Header
// This runs before every request is sent.
api.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        
        // If a token exists, add it to the Authorization header in the 'Bearer' format
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// 3. Response Interceptor (Optional but Recommended)
// This can be used to handle global errors (e.g., 401 Unauthorized globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check for 401 Unauthorized response globally
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request. Token may be expired or invalid.');
            // Optional: You could dispatch a global logout action here 
            // if the 401 response is due to an expired token.
        }
        return Promise.reject(error);
    }
);

export default api;