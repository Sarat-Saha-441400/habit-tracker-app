import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/apiService';
import { toast } from 'react-toastify'; // Use toast for global alerts if needed

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 1. Initialize state from localStorage for persistence
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    // Loading state is true initially while checking for existing tokens
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple initial load check complete
        setIsLoading(false);
    }, []);

    // --- Helper Function ---
    const handleAuthResponse = (userData) => {
        // Assuming API returns { _id, username, email, token, photoURL (optional) }
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    // --- Core Authentication Functions ---

    const login = async (email, password) => {
        try {
            // API call to the backend login route
            const response = await api.post('/auth/login', { email, password });
            handleAuthResponse(response.data);
            return response.data;
        } catch (error) {
            // Throw API error message for component display (handled by LoginForm/Toast)
            throw error.response?.data?.message || 'Login failed. Check your email and password.';
        }
    };

    const register = async (username, email, password, name, photoURL) => {
        try {
            // API call to the backend register route
            const response = await api.post('/auth/register', { 
                username, 
                email, 
                password,
                // Include Name and photoURL as required fields
                name: name || username,
                photoURL: photoURL || null
            });
            
            // Automatically log in the user immediately after successful registration
            handleAuthResponse(response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed.';
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.info("You have been logged out.");
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        // Placeholder for Google Login integration
        loginWithGoogle: () => { throw new Error('Google Auth not implemented.'); } 
    };

    // Prevent rendering the application until the initial session check is complete
    if (isLoading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading user session...</div>;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};