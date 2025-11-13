import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/apiService';
import { useAuth } from './AuthContext'; // Dependency on AuthContext
import { toast } from 'react-toastify';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    // 1. Core State
    const { token, isAuthenticated, logout } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Fetch Function (Stabilized with useCallback)
    const fetchHabits = useCallback(async () => {
        if (!isAuthenticated || !token) {
            setHabits([]);
            // Don't set error/loading if simply unauthenticated
            return; 
        }

        setLoading(true);
        setError(null);
        try {
            // Ensure the Authorization header is set for this request
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const response = await api.get('/habits/my'); 
            
            setHabits(response.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Could not load habits.';
            setError(errorMessage);
            
            // If API returns 401, force frontend logout
            if (err.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
                logout();
            }
        } finally {
             setLoading(false);
        }
    }, [isAuthenticated, token, logout]); 

    // 3. Effect Hook (Triggers fetch only when authentication state changes)
    // This resolves the infinite loop issue.
    useEffect(() => {
        // fetchHabits is a stable function due to useCallback, 
        // ensuring this effect runs only when token/auth status changes.
        fetchHabits(); 
    }, [fetchHabits]);

    // --- Mutation Helpers ---
    
    // Helper to update local state after successful API call
    const updateLocalHabitState = (updatedHabit) => {
        setHabits(prevHabits => 
            prevHabits.map(habit => 
                habit._id === updatedHabit._id ? updatedHabit : habit
            )
        );
    };

    // Helper to remove habit from local state after deletion
    const removeLocalHabitState = (id) => {
        setHabits(prevHabits => prevHabits.filter(habit => habit._id !== id));
    };

    // --- Mutation Actions for other components/hooks ---

    const addHabit = async (habitData) => {
        setLoading(true);
        try {
            const response = await api.post('/habits', habitData);
            setHabits(prev => [response.data, ...prev]); 
            toast.success(`Habit "${response.data.name}" added successfully!`);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to add habit.';
            toast.error(message);
            throw message; 
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (habitId) => {
        try {
            const response = await api.put(`/habits/complete/${habitId}`);
            updateLocalHabitState(response.data);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update completion status.';
            toast.error(message);
            throw message;
        }
    };
    
    const deleteHabit = async (habitId) => {
        try {
            await api.delete(`/habits/${habitId}`);
            removeLocalHabitState(habitId);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to delete habit.';
            toast.error(message);
            throw message;
        }
    };

    const value = {
        habits,
        loading,
        error,
        fetchHabits, // Still exposed for manual refresh
        addHabit,
        toggleComplete,
        deleteHabit,
        // Expose helpers for useHabitActions hook to manage local state
        updateLocalHabitState,
        removeLocalHabitState, 
    };

    return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};