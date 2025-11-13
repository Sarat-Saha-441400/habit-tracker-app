// client/src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div className="container" style={containerStyle}>
                <p>&copy; {new Date().getFullYear()} Habit Tracker App. All rights reserved.</p>
                <div style={linkContainerStyle}>
                    <a href="/browse" style={linkStyle}>Browse</a>
                    <a href="#" style={linkStyle}>Support</a>
                </div>
            </div>
        </footer>
    );
};

// Inline Styles
const footerStyle = { 
    padding: '20px 0', 
    borderTop: '1px solid #ddd', 
    marginTop: '50px', 
    textAlign: 'center', 
    background: '#fcfcfc',
    width: '100%',
};
const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
};
const linkContainerStyle = { marginTop: '10px' };
const linkStyle = { margin: '0 10px', color: 'var(--primary-color)' };

export default Footer;