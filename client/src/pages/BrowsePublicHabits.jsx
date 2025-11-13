import React, { useState, useEffect } from 'react';
import api from '../services/apiService.js'; // Ensure .js or .jsx extension is correct
import HabitCard from '../components/habits/HabitCard.jsx'; // Ensure .jsx extension is correct

const BrowsePublicHabits = () => {
    const [publicHabits, setPublicHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicHabits = async () => {
            try {
                const response = await api.get('/habits/public');
                
                // IMPORTANT FIX: Ensure the received data is an array before setting state
                if (Array.isArray(response.data)) {
                    setPublicHabits(response.data);
                } else {
                    // Handle cases where API returns an object (e.g., if no habits are found)
                    setError('API returned invalid data format.');
                    setPublicHabits([]); // Reset to empty array
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch public habits.');
                setPublicHabits([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };
        fetchPublicHabits();
    }, []);

    if (loading) return <h2 style={{ textAlign: 'center', padding: '20px' }}>Loading Public Habits...</h2>;
    if (error) return <h2 style={{ color: 'var(--danger-color)', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div>
            <h1>Explore Habit Ideas 💡</h1>
            <p>See what goals others are working on for inspiration.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                
                {/* SAFE CHECK: Ensure publicHabits is an array before trying to map */}
                {Array.isArray(publicHabits) && publicHabits.length === 0 ? (
                    <p>No public habits available at the moment.</p>
                ) : (
                    Array.isArray(publicHabits) && publicHabits.map(habit => (
                        <HabitCard key={habit._id} habit={habit} isPublicView={true} />
                    ))
                )}
                
                {/* Fallback in case publicHabits is not an array (though error state handles most cases) */}
                {!Array.isArray(publicHabits) && <p style={{ color: 'var(--danger-color)' }}>Data corruption error.</p>}

            </div>
        </div>
    );
};

export default BrowsePublicHabits;