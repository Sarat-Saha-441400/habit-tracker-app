import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'; 
// Note: Assuming you install react-icons: npm install react-icons

const Footer = () => {
    // Determine the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section" style={footerStyle}>
            <div className="container" style={containerStyle}>
                
                {/* Top Section: Branding and Navigation Links */}
                <div style={topSectionStyle}>
                    <div style={brandStyle}>
                        <h2 style={logoStyle}>HabitTracker</h2>
                        <p style={{ fontSize: '0.9em', color: '#ccc' }}>Build consistency, one day at a time.</p>
                    </div>

                    {/* Navigation/Support Links */}
                    <div style={linksGroupStyle}>
                        <h4 style={headingStyle}>Explore</h4>
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/browse" style={linkStyle}>Browse Public Habits</Link>
                        <Link to="/habits" style={linkStyle}>My Dashboard</Link>
                    </div>

                    {/* Legal/Contact Links */}
                    <div style={linksGroupStyle}>
                        <h4 style={headingStyle}>Support</h4>
                        <a href="#support" style={linkStyle}>Contact Support</a>
                        <a href="#terms" style={linkStyle}>Terms & Conditions</a>
                        <a href="#privacy" style={linkStyle}>Privacy Policy</a>
                    </div>
                </div>

                <hr style={separatorStyle} />

                {/* Bottom Section: Copyright and Social Media */}
                <div style={bottomSectionStyle}>
                    <p style={copyrightStyle}>&copy; {currentYear} HabitTracker App. All rights reserved.</p>
                    
                    <div style={socialStyle}>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} aria-label="Follow us on X (Twitter)">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} aria-label="Follow us on Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} aria-label="Follow us on Instagram">
                            <FaInstagram />
                        </a>
                        <a href="mailto:support@habittracker.com" style={socialLinkStyle} aria-label="Email Support">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

// --- Inline Styles for Footer Consistency ---

const footerStyle = { 
    padding: '40px 0 20px', 
    backgroundColor: '#1a202c', // Dark background matching the header
    color: '#ddd', 
    marginTop: '50px', 
    borderTop: '5px solid var(--primary-color)',
};
const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
};
const topSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
    paddingBottom: '20px',
};
const brandStyle = {
    // Logo style inherited from header for consistency
    color: 'var(--accent-color)', 
};
const logoStyle = {
    fontSize: '1.8em',
    fontWeight: '800',
    marginBottom: '10px',
    color: 'var(--accent-color)',
};
const headingStyle = {
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'white',
    borderBottom: '2px solid var(--primary-color)',
    display: 'inline-block',
    paddingBottom: '5px',
};
const linksGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
};
const linkStyle = { 
    margin: '5px 0', 
    color: '#ccc',
    fontSize: '0.95em',
    transition: 'color 0.2s',
};
const separatorStyle = {
    border: 0,
    borderTop: '1px solid #333',
    margin: '20px 0',
};
const bottomSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '10px',
};
const copyrightStyle = {
    fontSize: '0.85em',
    color: '#aaa',
};
const socialStyle = {
    display: 'flex',
    gap: '20px',
    fontSize: '1.5em',
};
const socialLinkStyle = {
    color: '#ccc',
    transition: 'color 0.2s',
};
const socialLinkHoverStyle = {
    color: 'var(--accent-color)',
};

export default Footer;