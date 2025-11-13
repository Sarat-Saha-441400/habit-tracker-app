// client/src/hooks/useHabitActions.js
import { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';

/**
 * @description Custom hook providing localized loading/error handling for habit actions.
 * @returns {object} Contains action functions (e.g., toggle, delete) and their status.
 */
const useHabitActions = () => {
    const { toggleComplete, deleteHabit, updateHabit } = useHabits();
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    const runAction = async (actionFunction, ...args) => {
        setActionLoading(true);
        setActionError(null);
        try {
            await actionFunction(...args);
        } catch (error) {
            const errorMessage = error.message || 'An unexpected error occurred during the action.';
            setActionError(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggleComplete = (habitId) => {
        return runAction(toggleComplete, habitId);
    };

    const handleDeleteHabit = (habitId) => {
        if (window.confirm('Are you sure you want to delete this habit?')) {
            return runAction(deleteHabit, habitId);
        }
    };
    
    const handleUpdateHabit = (habitId, data) => {
        return runAction(updateHabit, habitId, data);
    };

    return {
        actionLoading,
        actionError,
        handleToggleComplete,
        handleDeleteHabit,
        handleUpdateHabit,
    };
};

export default useHabitActions;