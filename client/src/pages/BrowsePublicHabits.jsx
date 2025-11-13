import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/apiService.js';
import HabitCard from '../components/habits/HabitCard.jsx';

// Available categories for filtering
const ALL_CATEGORIES = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

// Placeholder Data for development/fallback
const DUMMY_PUBLIC_HABITS = [
    { _id: 'p1', name: 'Daily Meditation', description: 'Spend 10 minutes practicing mindfulness.', category: 'Morning', user: { username: 'ZenMaster' } },
    { _id: 'p2', name: 'Review Code', description: 'Review 1 PR or code file every afternoon.', category: 'Work', user: { username: 'CodeNinja' } },
    { _id: 'p3', name: 'Evening Stretch', description: 'Stretch for 15 minutes before bed.', category: 'Evening', user: { username: 'FlexibilityFan' } },
    { _id: 'p4', name: 'Read a Book', description: 'Read a chapter of a non-fiction book.', category: 'Study', user: { username: 'Bookworm' } },
];

const BrowsePublicHabits = () => {
    const navigate = useNavigate();
    const [publicHabits, setPublicHabits] = useState(DUMMY_PUBLIC_HABITS); // Initial data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State for Search and Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // 1. Fetch Public Habits on load
    useEffect(() => {
        const fetchPublicHabits = async () => {
            setLoading(true);
            setError(null);
            try {
                // GET /api/habits/public route
                const response = await api.get('/habits/public');
                if (Array.isArray(response.data)) {
                    setPublicHabits(response.data);
                }
            } catch (err) {
                toast.error("Failed to load public habits.");
                setError(err.message || 'Failed to fetch public habits.');
            } finally {
                setLoading(false);
            }
        };
        fetchPublicHabits();
    }, []);

    // 2. Combined Search and Filter Logic
    const filteredHabits = useMemo(() => {
        let results = publicHabits;
        
        // Filter by Category
        if (selectedCategory !== 'All') {
            results = results.filter(habit => habit.category === selectedCategory);
        }

        // Filter by Search Term (Title or Description keyword)
        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            results = results.filter(habit =>
                habit.name.toLowerCase().includes(lowerCaseSearch) ||
                habit.description.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return results;
    }, [publicHabits, selectedCategory, searchTerm]);

    const handleSeeDetails = (habitId) => {
        // Redirects to the details page, which is a Private Route
        navigate(`/habits/${habitId}`); 
    };

    if (loading) return <h2 style={{ textAlign: 'center', padding: '20px' }}>Loading Public Habits...</h2>;
    if (error) return <h2 style={{ color: 'var(--danger-color)', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div className="browse-habits-page container">
            <h1 style={{fontSize: '2.5em', marginBottom: '20px', color: 'var(--primary-color)'}}>Explore Habit Ideas 💡</h1>
            
            <div style={filterContainerStyle}>
                {/* Search Bar */}
                <input 
                    type="text" 
                    placeholder="Search by title or keyword..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyle}
                />

                {/* Category Dropdown */}
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={selectInputStyle}
                >
                    {ALL_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            
            <div style={habitGridStyle}>
                {filteredHabits.length > 0 ? (
                    filteredHabits.map(habit => (
                        <div key={habit._id} onClick={() => handleSeeDetails(habit._id)} style={cardWrapperStyle}>
                            <HabitCard 
                                habit={{
                                    ...habit,
                                    // Use 'name' instead of 'title' for consistency if API uses 'name'
                                    title: habit.name, 
                                }} 
                                isPublicView={true} 
                            />
                            <button style={detailsButtonStyle} className="btn-primary">View Details</button>
                        </div>
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '30px', color: '#666' }}>
                        No public habits match your search or filter criteria.
                    </p>
                )}
            </div>
        </div>
    );
};

// --- Inline Styles ---

const filterContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
};

const searchInputStyle = {
    flexGrow: 1,
    minWidth: '200px',
    maxWidth: '400px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
};

const selectInputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
};

const habitGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    justifyItems: 'center',
};

const cardWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0',
};

const detailsButtonStyle = {
    // Inherits styles from .btn-primary in index.css
    marginTop: '15px',
    width: '100%',
    padding: '10px',
};

export default BrowsePublicHabits;