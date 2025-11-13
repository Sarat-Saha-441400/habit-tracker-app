// client/src/components/home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <header className="hero-section" style={heroStyle}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={h1Style}>Master Your Daily Habits. Achieve Your Goals.</h1>
                <p style={pStyle}>
                    Track your progress, build powerful streaks, and join a community committed to self-improvement.
                </p>
                <Link to="/register" style={buttonStyle}>
                    Start Your First Habit Free
                </Link>
            </div>
        </header>
    );
};

// Inline Styles
const heroStyle = {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    marginBottom: '40px',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};
const h1Style = { fontSize: '3em', marginBottom: '15px' };
const pStyle = { fontSize: '1.2em', marginBottom: '30px' };
const buttonStyle = {
    padding: '12px 25px',
    backgroundColor: 'var(--accent-color)',
    color: 'black',
    fontWeight: 'bold',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
};

export default Hero;