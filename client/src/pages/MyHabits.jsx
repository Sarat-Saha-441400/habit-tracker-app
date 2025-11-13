import React, { useEffect } from 'react';
import { useHabits } from '../contexts/HabitContext.jsx';
import useHabitActions from '../hooks/useHabitActions.js';
import HabitTable from '../components/habits/HabitTable.jsx'; 
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa'; // Ensure FaPlus is imported

const MyHabits = () => { // <--- Component Definition Starts Here
    // State and data fetching from global context
    const { habits, loading, error, fetchHabits } = useHabits();
    
    // Action handlers for specific habit mutations (delete/toggle complete)
    const { 
        handleToggleComplete, 
        handleDeleteHabit, 
        actionError, 
        actionLoading 
    } = useHabitActions(); 
    
    const navigate = useNavigate();

    // Fetch user habits when the component mounts
    useEffect(() => {
        // We only call fetchHabits here. The logic inside HabitContext
        // will check if the user is authenticated before making the API call.
        fetchHabits(); 
    }, [fetchHabits]);

    // Show toast notification if an action (delete/toggle) fails
    useEffect(() => {
        if (actionError) {
            toast.error(`Action Failed: ${actionError}`);
        }
    }, [actionError]);

    // Handler for the Edit button (conceptual: would open UpdateHabitModal)
    const handleEdit = (id) => { 
        // Navigate to the edit page/route
        navigate(`/habits/${id}/edit`); 
    };

    // Handler for Delete button
    // NOTE: useHabitActions handles the actual deletion and confirmation.
    const handleDelete = async (id) => { 
        await handleDeleteHabit(id);
        // Note: The success toast is triggered here after the action hook finishes
        if (!actionError) {
            toast.success("Habit deleted successfully.");
        }
    };

    if (loading) return <h2 style={{ textAlign: 'center', padding: '20px' }}>Loading Habits...</h2>;
    if (error) return <h2 style={{ color: '#ef4444', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div className="my-habits-page container">
            <h1 style={{fontSize: '2.5em', marginBottom: '20px', color: 'var(--primary-color)'}}>My Daily Habits 🎯</h1>
            
            <Link 
                to="/habits/add" 
                className="btn-primary"
                style={createHabitLinkStyle} // Apply the locally defined style
            >
                <FaPlus style={{ marginRight: '5px' }} /> Create New Habit
            </Link>
            
            {habits.length === 0 ? (
                <div style={emptyStateStyle}>
                    <p>You haven't set up any habits yet. Time to start building!</p>
                    <p style={{ marginTop: '10px' }}>Click "Create New Habit" above to begin your consistency journey.</p>
                </div>
            ) : (
                <HabitTable 
                    habits={habits} 
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isActionLoading={actionLoading}
                />
            )}
        </div>
    );
}; // <--- Component Definition Ends Here (The Fix is ensuring this is defined first)

// --- Local Styles Defined After Component ---
const emptyStateStyle = { 
    textAlign: 'center', 
    padding: '40px', 
    border: '2px dashed #ccc', 
    marginTop: '20px', 
    borderRadius: '8px',
    backgroundColor: 'white'
};
const createHabitLinkStyle = { 
    display: 'inline-flex', // Ensure icon and text align well
    marginBottom: '20px', 
    // The rest of the styling comes from .btn-primary in index.css
};

export default MyHabits; // <--- Export Statement Works Here