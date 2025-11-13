// client/src/pages/HabitDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/apiService';

const HabitDetails = () => {
    const { id } = useParams(); // Get habit ID from URL
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                // Note: You may need a specific single habit GET route on the server
                // For now, we'll simulate fetching all and finding it, or assume a GET /api/habits/:id exists
                const response = await api.get(`/habits/my`); 
                const foundHabit = response.data.find(h => h._id === id);
                
                if (foundHabit) {
                    setHabit(foundHabit);
                } else {
                    setError('Habit not found.');
                }
            } catch (err) {
                setError('Failed to fetch habit details.');
            } finally {
                setLoading(false);
            }
        };
        fetchHabit();
    }, [id]);

    if (loading) return <h2>Loading Habit Details...</h2>;
    if (error) return <h2 style={{ color: 'var(--danger-color)' }}>Error: {error}</h2>;
    if (!habit) return <h2 style={{ color: 'var(--danger-color)' }}>Habit not found.</h2>;

    // Logic to display completion history, charts, edit form, etc.
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1>{habit.name} </h1>
            <p><strong>Description:</strong> {habit.description}</p>
            <p><strong>Frequency:</strong> {habit.frequency}</p>
            <p><strong>Current Streak:</strong> {habit.currentStreak || 0} days ⚡</p>

            <h3 style={{ marginTop: '25px' }}>Completion History</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px' }}>
                {habit.completedDates.map((date, index) => (
                    <li key={index} style={{ padding: '5px 0' }}>{new Date(date).toLocaleDateString()}</li>
                ))}
            </ul>

            {/* Placeholder for an edit button that opens a modal */}
            <button style={{ marginTop: '20px', padding: '10px 15px', background: 'var(--accent-color)', color: 'black', border: 'none', borderRadius: '4px' }}>
                Edit Habit
            </button>
        </div>
    );
};

export default HabitDetails;