import { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { toast } from 'react-toastify';

/**
 * @description Custom hook providing localized loading/error handling for habit actions 
 * (Toggle Complete, Delete, Update). It uses the global actions from HabitContext.
 * @returns {object} Contains action functions and their status.
 */
const useHabitActions = () => {
    // Get mutation functions from the global context
    const { toggleComplete, deleteHabit, updateHabit } = useHabits();
    
    const [actionLoading, setActionLoading] = useState(false);
    
    /**
     * Executes an async action function and handles loading/toasting logic.
     * @param {Function} actionFunction - The asynchronous function from the context (e.g., toggleComplete).
     * @param {any[]} args - Arguments to pass to the action function.
     */
    const runAction = async (actionFunction, successMessage, ...args) => {
        setActionLoading(true);
        try {
            await actionFunction(...args);
            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error.message || 'An unexpected error occurred during the action.';
            toast.error(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggleComplete = (habitId) => {
        // Since toggleComplete handles both marking and unmarking, we use a general message
        return runAction(toggleComplete, "Habit completion status updated!", habitId);
    };

    const handleDeleteHabit = (habitId) => {
        // UI Requirement: Confirm before delete
        if (window.confirm('Are you sure you want to permanently delete this habit? This action cannot be undone.')) {
            return runAction(deleteHabit, "Habit successfully deleted.", habitId);
        }
    };
    
    const handleUpdateHabit = (habitId, data) => {
        return runAction(updateHabit, "Habit details updated.", habitId, data);
    };

    return {
        actionLoading,
        handleToggleComplete,
        handleDeleteHabit,
        handleUpdateHabit,
    };
};

export default useHabitActions;