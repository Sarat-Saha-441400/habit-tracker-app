// client/src/contexts/HabitContext.js
import React, { createContext, useState, useContext } from 'react';
import api from '../services/apiService';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Data Fetching and Mutation Actions ---

    const fetchHabits = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/habits/my');
            setHabits(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch habits');
        } finally {
            setLoading(false);
        }
    };
    
    const addHabit = async (habitData) => {
        setLoading(true);
        try {
            const response = await api.post('/habits', habitData);
            // Prepend new habit to the list
            setHabits(prev => [response.data, ...prev]); 
            return response.data;
        } catch (err) {
            throw err.response?.data?.message || 'Failed to add habit';
        } finally {
            setLoading(false);
        }
    };
    
    const toggleComplete = async (habitId) => {
        try {
            // API call to mark/unmark the habit complete
            const response = await api.put(`/habits/complete/${habitId}`);
            
            // Update the single habit in the local state with the new data (including updated streak/dates)
            setHabits(prev => prev.map(habit => 
                habit._id === habitId ? response.data : habit
            ));
            
            return response.data;
        } catch (err) {
            throw err.response?.data?.message || 'Failed to update completion status';
        }
    };

    // Placeholders for other actions
    const deleteHabit = (id) => { /* API call and state update logic */ };
    const updateHabit = (id, data) => { /* API call and state update logic */ };


    const value = {
        habits,
        loading,
        error,
        fetchHabits,
        addHabit,
        toggleComplete,
        deleteHabit,
        updateHabit,
    };

    return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};