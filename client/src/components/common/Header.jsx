import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';
import { FaUserCircle, FaCaretDown, FaSignOutAlt, FaPlus, FaTachometerAlt, FaSearch } from 'react-icons/fa'; 

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header className="header">
            
            {/* 1. Logo/Branding Section (UI Consistency) */}
            <div className="header__logo">
                <Link to="/">
                    <h1>HabitTracker</h1> 
                </Link>
            </div>
            
            {/* 2. Primary Navigation Links */}
            <nav className="header__nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/browse"><FaSearch style={{ marginRight: '5px' }}/> Browse</Link></li>
                    
                    {/* Protected Routes: Visible only when authenticated */}
                    {isAuthenticated && (
                        <>
                            <li><Link to="/habits/add"><FaPlus style={{ marginRight: '5px' }}/> Add Habit</Link></li>
                            <li><Link to="/habits"><FaTachometerAlt style={{ marginRight: '5px' }}/> My Habits</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            {/* 3. Action Button / User Dropdown */}
            <div className="header__actions">
                {isAuthenticated ? (
                    /* Logged-In User Profile Dropdown */
                    <div className="user-menu-container">
                        <button 
                            onClick={toggleDropdown} 
                            className="user-profile-button btn-primary"
                            aria-expanded={isDropdownOpen}
                            aria-label="User menu"
                        >
                            {/* Display photoURL or fallback icon */}
                            {user?.photoURL ? (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.name || 'User'} 
                                    className="user-avatar" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/30x30/4f46e5/ffffff?text=U" }}
                                />
                            ) : (
                                <FaUserCircle style={{ fontSize: '1.2rem', marginRight: '5px' }} />
                            )}
                            <FaCaretDown style={{ marginLeft: '8px' }} />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                {/* Display displayName and email */}
                                <div className="dropdown-info">
                                    <p className="user-name-display">{user?.name || user?.username || 'User'}</p>
                                    <p className="user-email-display">{user?.email}</p>
                                </div>
                                <hr />
                                {/* Log out button */}
                                <button onClick={handleLogout} className="dropdown-item logout-btn">
                                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Log out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Not Logged-In Buttons */
                    <>
                        <Link to="/login" className="btn-secondary" style={{ marginRight: '10px' }}>Login</Link>
                        <Link to="/register" className="btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
            
        </header>
    );
};

export default Header;