import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/apiService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleAuthResponse = (userData) => {
        // Backend usually returns { user: {...}, token: "..." } or just the user with token inside
        const userToStore = userData.user || userData;
        const tokenToStore = userData.token || userToStore.token;

        setUser(userToStore);
        setToken(tokenToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        localStorage.setItem('token', tokenToStore);
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            handleAuthResponse(response.data);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Login failed.';
            toast.error(errorMsg);
            throw errorMsg;
        }
    };

    // FIXED: Accept an object instead of 5 separate positional arguments
    const register = async (userData) => {
        try {
            // We spread userData to ensure name, email, password, and photoURL are sent
            // If your backend specifically requires "username", we ensure it's there
            const payload = {
                ...userData,
                username: userData.username || userData.email.split('@')[0] // Fallback if username is empty
            };

            const response = await api.post('/auth/register', payload);
            
            handleAuthResponse(response.data);
            toast.success("Registration successful!");
            return response.data;
        } catch (error) {
            // Detailed logging to help you see the EXACT server error in the console
            console.error("Registration Error Details:", error.response?.data);
            const errorMsg = error.response?.data?.message || 'Registration failed.';
            toast.error(errorMsg);
            throw errorMsg;
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
        loginWithGoogle: () => { throw new Error('Google Auth not implemented.'); } 
    };

    if (isLoading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading user session...</div>;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};