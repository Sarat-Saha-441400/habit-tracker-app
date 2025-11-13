import React, { useEffect } from 'react';
import { useHabits } from '../contexts/HabitContext.jsx';
import useHabitActions from '../hooks/useHabitActions.js'; // Assuming this hook exists
import HabitTable from '../components/habits/HabitTable.jsx'; 
import { Link } from 'react-router-dom';

const MyHabits = () => {
    // This component must be wrapped in <HabitProvider> in App.jsx
    const { habits, loading, error, fetchHabits } = useHabits();
    
    // Note: useHabitActions uses toggleComplete, deleteHabit, updateHabit from useHabits
    const { handleToggleComplete, handleDeleteHabit } = useHabitActions(); 

    useEffect(() => {
        // Fetch habits only after the component mounts
        fetchHabits(); 
    }, []);

    // Placeholder handlers for table component
    const handleEdit = (id) => { console.log(`Editing habit: ${id}`); };
    const handleDelete = (id) => { handleDeleteHabit(id); };

    if (loading) return <h2>Loading Habits...</h2>;
    if (error) return <h2 style={{ color: 'var(--danger-color)' }}>Error: {error}</h2>;

    return (
        <div>
            <h1>My Daily Habits 🎯</h1>
            
            {habits.length === 0 ? (
                <div style={emptyStateStyle}>
                    <p>You haven't set up any habits yet. Time to start building!</p>
                    <Link to="/add-habit" style={linkStyle}>
                        Create Your First Habit Now
                    </Link>
                </div>
            ) : (
                <HabitTable 
                    habits={habits} 
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

const emptyStateStyle = { textAlign: 'center', padding: '40px', border: '2px dashed var(--primary-color)', marginTop: '20px', borderRadius: '8px' };
const linkStyle = { display: 'inline-block', marginTop: '15px', color: 'var(--primary-color)', fontWeight: 'bold' };

export default MyHabits;