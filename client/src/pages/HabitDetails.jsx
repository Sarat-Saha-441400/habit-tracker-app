import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFire, FaChartLine, FaUserCircle } from 'react-icons/fa';
import api from '../services/apiService';
import useHabitActions from '../hooks/useHabitActions'; // For Mark Complete

// --- Streak and Progress Calculation Helpers ---

/**
 * Calculates the current consecutive daily streak.
 * Assumes completedDates are stored as Date objects (timestamps).
 */
const calculateStreak = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return 0;

    // Convert dates to YYYY-MM-DD strings for accurate date comparison (ignoring time/timezone issues)
    const uniqueDates = Array.from(new Set(
        completedDates.map(d => new Date(d).toISOString().slice(0, 10))
    )).sort();

    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Midnight UTC today

    for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const currentDate = new Date(uniqueDates[i] + 'T00:00:00.000Z'); // Normalize to midnight UTC
        const diffTime = today.getTime() - currentDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Completed today, continue to check yesterday
            streak++;
            today.setDate(today.getDate() - 1); // Move comparison date back one day
        } else if (diffDays === 1) {
            // Completed yesterday, continue streak
            streak++;
            today.setDate(today.getDate() - 1); // Move comparison date back one day
        } else if (diffDays > 1) {
            // Gap detected, streak broken
            break;
        }
    }
    return streak;
};

/**
 * Calculates completion percentage over the last 30 calendar days.
 */
const calculateProgress = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return 0;
    
    const totalDays = 30;
    const now = Date.now();

    const uniqueCompletedDays = new Set(
        completedDates
            .filter(d => (now - new Date(d).getTime()) <= (30 * 24 * 60 * 60 * 1000))
            .map(d => new Date(d).toISOString().slice(0, 10))
    ).size;

    return Math.min(100, Math.round((uniqueCompletedDays / totalDays) * 100));
};

// --- Component Start ---

const HabitDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Use the custom hook for actions
    const { handleToggleComplete, actionLoading } = useHabitActions();

    // Fetch single habit details (or all and filter, as implemented here)
    useEffect(() => {
        const fetchHabit = async () => {
            setLoading(true);
            setError(null);
            try {
                // Ideally, this hits a GET /api/habits/:id endpoint.
                // Using a fallback fetching all and finding it:
                const response = await api.get(`/habits/my`); 
                const foundHabit = response.data.find(h => h._id === id);
                
                if (foundHabit) {
                    setHabit(foundHabit);
                } else {
                    throw new Error('Habit not found or access denied.');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch habit details.');
                toast.error("Failed to load details: " + (err.message || "Server Error"));
            } finally {
                setLoading(false);
            }
        };
        fetchHabit();
    }, [id]);

    // Derived values updated instantly when 'habit' state changes
    const currentStreak = useMemo(() => habit ? calculateStreak(habit.completedDates) : 0, [habit]);
    const progressPercent = useMemo(() => habit ? calculateProgress(habit.completedDates) : 0, [habit]);
    const isCompletedToday = useMemo(() => habit ? habit.completedDates.some(d => 
        new Date(d).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
    ) : false, [habit]);

    const handleActionClick = async () => {
        await handleToggleComplete(habit._id);
        // After successful toggle, re-fetch data to update component streak/progress
        // In a fully optimized app, the useHabitActions hook updates the global state directly.
        // For robustness, we simulate a small update here:
        setHabit(prev => ({ 
            ...prev, 
            completedDates: isCompletedToday 
                ? prev.completedDates.filter(d => new Date(d).toISOString().slice(0, 10) !== new Date().toISOString().slice(0, 10))
                : [...prev.completedDates, new Date().toISOString()],
        }));
    };

    if (loading) return <h2 style={loadingStyle}>Loading Habit Details...</h2>;
    if (error || !habit) return <h2 style={errorStyle}>Error: {error || 'Habit data unavailable.'}</h2>;

    return (
        <div style={detailPageStyle}>
            <div style={cardHeaderStyle}>
                <h1 style={titleStyle}>{habit.name}</h1>
                <p style={categoryStyle}>Category: {habit.category}</p>
            </div>

            <div style={contentGridStyle}>
                
                {/* Left Column: Image and Description */}
                <div style={infoColumnStyle}>
                    <img src={habit.imageUrl || 'https://placehold.co/400x250/3f51b5/ffffff?text=Habit+Image'} alt={habit.name} style={imageStyle} />
                    <p style={descriptionStyle}>{habit.description}</p>
                    
                    <div style={creatorInfoStyle}>
                        <FaUserCircle style={{ marginRight: '8px', fontSize: '1.2rem' }} />
                        Creator: **{habit.user?.username || 'Unknown'}**
                    </div>
                </div>

                {/* Right Column: Stats and Actions */}
                <div style={statsColumnStyle}>
                    
                    {/* Streak Badge */}
                    <div style={badgeStyle}>
                        <FaFire style={{ marginRight: '8px' }} />
                        Current Streak: **{currentStreak} days**
                    </div>

                    {/* Progress Bar (% of days completed in last 30) */}
                    <div style={progressContainerStyle}>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <FaChartLine style={{ marginRight: '8px' }} /> 30-Day Completion Progress
                            <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{progressPercent}%</span>
                        </p>
                        <div style={barWrapperStyle}>
                            <div style={{ ...progressBarFillStyle, width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                    
                    {/* Mark Complete Button */}
                    <button 
                        onClick={handleActionClick} 
                        className="btn-primary"
                        disabled={actionLoading}
                        style={markCompleteButtonStyle(isCompletedToday, actionLoading)}
                    >
                        {actionLoading 
                            ? 'Processing...' 
                            : isCompletedToday 
                                ? 'Undo Completion Today' 
                                : 'Mark Complete Today'
                        }
                    </button>
                    
                    {/* Optional: Edit/Delete Links (assuming modal handling) */}
                    <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                        <button className="btn-secondary" onClick={() => navigate(`/habits/${habit._id}/edit`)}>Edit Habit</button>
                        <button className="btn-secondary" style={{ color: 'var(--danger-color)' }}>Delete Habit</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Inline Styles for UI Consistency ---

const detailPageStyle = {
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: '40px auto',
};

const cardHeaderStyle = {
    borderBottom: '2px solid var(--primary-color)',
    paddingBottom: '15px',
    marginBottom: '20px',
};

const titleStyle = {
    fontSize: '2.5rem',
    color: 'var(--text-color)',
    marginBottom: '5px',
};

const categoryStyle = {
    fontSize: '1em',
    color: '#666',
    fontWeight: 'bold',
};

const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '30px',
};

const infoColumnStyle = {
    paddingRight: '20px',
    borderRight: '1px solid #eee',
};

const statsColumnStyle = {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const imageStyle = {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #ddd',
};

const descriptionStyle = {
    marginBottom: '20px',
    fontSize: '1.1em',
};

const creatorInfoStyle = {
    fontSize: '0.9em',
    color: 'var(--primary-color)',
    padding: '10px 0',
    borderTop: '1px dashed #eee',
};

const badgeStyle = {
    background: 'var(--accent-color)',
    color: 'var(--text-color)',
    fontWeight: 'bold',
    padding: '12px 20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2em',
};

const progressContainerStyle = {
    background: 'var(--light-gray)',
    padding: '15px',
    borderRadius: '8px',
};

const barWrapperStyle = {
    height: '10px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '10px',
};

const progressBarFillStyle = {
    height: '100%',
    backgroundColor: 'var(--success-color)',
    transition: 'width 0.5s ease-in-out',
};

const markCompleteButtonStyle = (isCompletedToday, isLoading) => ({
    padding: '15px 20px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    borderRadius: '8px',
    width: '100%',
    marginTop: '10px',
    backgroundColor: isCompletedToday ? '#666' : 'var(--success-color)',
    color: 'white',
    cursor: isLoading ? 'wait' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
});

const loadingStyle = { textAlign: 'center', padding: '50px' };
const errorStyle = { textAlign: 'center', padding: '50px', color: 'var(--danger-color)' };

// Responsive adjustment for grid
if (window.innerWidth < 768) {
    contentGridStyle.gridTemplateColumns = '1fr';
    infoColumnStyle.borderRight = 'none';
    infoColumnStyle.paddingRight = '0';
    statsColumnStyle.paddingLeft = '0';
    statsColumnStyle.marginTop = '20px';
}

export default HabitDetails;