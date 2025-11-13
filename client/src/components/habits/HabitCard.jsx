import React from 'react';
import { Link } from 'react-router-dom';
import { FaBolt, FaUser, FaSeedling, FaEye } from 'react-icons/fa';

// Helper to determine the status text and icon
const getStatusInfo = (habit) => {
    // Assuming habit data structure includes category and creatorName
    const categoryIcon = habit.category === 'Fitness' ? '🏋️' : habit.category === 'Study' ? '📚' : '🌱';

    return {
        icon: categoryIcon,
        streak: habit.currentStreak || 0, // Get calculated streak
        creator: habit.user?.username || 'Unknown Creator',
        isPublic: !!habit.user, // Assume if user info is present, it's public/featured view
    };
};

const HabitCard = ({ habit, isFeatured = false }) => {
    // Determine the path for the details page
    const detailsPath = `/habits/${habit._id}`;
    const status = getStatusInfo(habit);

    // Truncate description for card view
    const displayDescription = habit.description 
        ? habit.description.substring(0, 75) + (habit.description.length > 75 ? '...' : '') 
        : 'No description available.';

    return (
        <div className="habit-card" style={cardStyle}>
            <div style={iconContainerStyle}>
                <span style={iconInnerStyle}>{status.icon}</span>
                <p style={categoryTagStyle}>{habit.category || 'General'}</p>
            </div>
            
            <h3 style={titleStyle}>{habit.title}</h3>
            <p style={descriptionStyle}>{displayDescription}</p>
            
            <div style={infoGroupStyle}>
                {/* Show Streak badge for user's own habits, or Creator for public view */}
                {isFeatured ? (
                    <p style={creatorStyle} title="Creator">
                        <FaUser style={{ marginRight: '5px', color: '#888' }} /> {status.creator}
                    </p>
                ) : (
                    <p style={streakStyle} title="Current Streak">
                        <FaBolt style={{ marginRight: '5px' }} /> **{status.streak} days**
                    </p>
                )}
            </div>
            
            {/* View Details Button (UI consistency) */}
            <Link to={detailsPath} className="btn-primary" style={buttonStyle}>
                <FaEye style={{ marginRight: '5px' }} /> View Details
            </Link>
        </div>
    );
};

// --- Inline Styles (Ensuring equal height/width as per UI requirements 7 & 8) ---
const cardStyle = { 
    padding: '20px', 
    border: '1px solid #ddd', 
    borderRadius: '10px', 
    backgroundColor: 'white',
    boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
    flex: '1 1 300px', // Ensures equal width in a grid context
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '280px', // Fixed minimum height for consistency
    transition: 'transform 0.3s',
};
const iconContainerStyle = {
    textAlign: 'center',
    marginBottom: '15px',
};
const iconInnerStyle = {
    fontSize: '2.5rem',
    display: 'block',
};
const categoryTagStyle = {
    fontSize: '0.8em',
    color: '#888',
    marginTop: '5px',
};
const titleStyle = { 
    color: 'var(--primary-color)', 
    marginBottom: '10px',
    fontSize: '1.25em',
    fontWeight: '700',
    textAlign: 'center',
};
const descriptionStyle = {
    color: '#555',
    fontSize: '0.95em',
    marginBottom: '15px',
    flexGrow: 1, // Pushes the bottom elements down
};
const infoGroupStyle = { 
    marginTop: '10px', 
    paddingTop: '10px', 
    borderTop: '1px solid #eee', 
    fontSize: '0.9em',
};
const streakStyle = {
    color: 'var(--success-color)',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
};
const creatorStyle = {
    color: '#666',
    display: 'flex',
    alignItems: 'center',
};
const buttonStyle = { 
    marginTop: '15px', 
    textAlign: 'center', 
    // Inherits .btn-primary, ensuring UI consistency
};

export default HabitCard;