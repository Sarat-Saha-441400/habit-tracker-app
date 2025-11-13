// client/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/apiService'; // Your configured Axios instance

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage for persistence across refreshes
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple initial load check
        if (token && user) {
             // You could add a token validation check here if needed
        }
        setIsLoading(false);
    }, [token, user]);

    // --- Core Authentication Functions ---

    const handleAuthResponse = (userData) => {
        // Store user and token in state and local storage
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            handleAuthResponse(response.data);
            return response.data;
        } catch (error) {
            // Throw API error message for component display
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await api.post('/auth/register', { username, email, password });
            // Log in the user immediately after successful registration
            handleAuthResponse(response.data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    // Prevent rendering app content before initial state check is complete
    if (isLoading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading user session...</div>;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};