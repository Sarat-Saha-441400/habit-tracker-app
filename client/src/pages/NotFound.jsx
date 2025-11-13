import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    // Use inline styles consistent with the overall app aesthetic
    const containerStyle = {
        textAlign: 'center',
        padding: '80px 20px',
        maxWidth: '600px',
        margin: '50px auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    };

    const headingStyle = {
        fontSize: '4rem',
        color: 'var(--danger-color)',
        marginBottom: '10px',
    };

    const subHeadingStyle = {
        fontSize: '1.8rem',
        color: 'var(--text-color)',
        marginBottom: '20px',
    };

    const paragraphStyle = {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '30px',
    };
    
    // Uses the centralized button style from index.css (.btn-primary)

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>404</h1>
            <h2 style={subHeadingStyle}>Page Not Found 😟</h2>
            <p style={paragraphStyle}>
                We can't find the page you're looking for. It might have been moved or deleted.
            </p>
            <button 
                onClick={() => navigate('/')} 
                className="btn-primary"
                style={{ alignSelf: 'center' }}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default NotFound;