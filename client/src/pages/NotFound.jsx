// client/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>404 - Page Not Found 😟</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" style={{ color: 'var(--primary-color)', marginTop: '20px', display: 'inline-block' }}>Go to Homepage</Link>
        </div>
    );
};

export default NotFound;