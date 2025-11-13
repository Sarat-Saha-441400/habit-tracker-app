// client/src/components/habits/HabitCard.jsx
import React from 'react';
import { FaBolt, FaUser, FaCheckCircle } from 'react-icons/fa';

// Helper to check if the habit was completed today
const isCompletedToday = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return false;
    const todayString = new Date().toISOString().slice(0, 10);
    return completedDates.some(date => new Date(date).toISOString().slice(0, 10) === todayString);
};

const HabitCard = ({ habit, onToggleComplete, isPublicView = false }) => {
    const completed = isCompletedToday(habit.completedDates);

    return (
        <div className="habit-card" style={cardStyle}>
            <h3 style={titleStyle}>{habit.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9em' }}>{habit.description.substring(0, 60)}...</p>
            
            <div style={infoGroupStyle}>
                {isPublicView ? (
                    <p><FaUser style={{ marginRight: '5px' }} /> {habit.user?.username || 'Anonymous'}</p>
                ) : (
                    <>
                        <p><FaBolt style={{ marginRight: '5px' }} /> **{habit.currentStreak || 0} days**</p>
                        <p style={{ color: completed ? 'var(--success-color)' : '#aaa' }}>
                            <FaCheckCircle /> {completed ? 'Done Today' : 'Pending'}
                        </p>
                    </>
                )}
            </div>
            
            {!isPublicView && onToggleComplete && (
                <button 
                    onClick={() => onToggleComplete(habit._id)} 
                    style={buttonStyle}
                >
                    {completed ? 'Undo Completion' : 'Mark Complete'}
                </button>
            )}
        </div>
    );
};

// --- Inline Styles ---
const cardStyle = { 
    padding: '20px', 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};
const titleStyle = { 
    color: 'var(--primary-color)', 
    marginBottom: '10px' 
};
const infoGroupStyle = { 
    marginTop: '15px', 
    paddingTop: '10px', 
    borderTop: '1px solid #eee', 
    fontSize: '0.9em' 
};
const buttonStyle = { 
    marginTop: '15px', 
    padding: '10px', 
    border: 'none', 
    borderRadius: '4px', 
    background: 'var(--accent-color)', 
    color: 'black',
    cursor: 'pointer',
    fontWeight: 'bold',
};

export default HabitCard;