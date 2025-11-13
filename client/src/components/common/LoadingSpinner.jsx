import React from 'react';

const LoadingSpinner = ({ message = "Loading data..." }) => {
    return (
        <div style={containerStyle}>
            <div style={spinnerStyle}></div>
            <p style={{ marginTop: '10px' }}>{message}</p>
        </div>
    );
};

const spinAnimation = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject keyframes into a style tag for demonstration (in a real app, use CSS file)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = spinAnimation;
  document.head.appendChild(style);
}

const containerStyle = {
    textAlign: 'center',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const spinnerStyle = {
    border: '4px solid #f3f3f3', /* Light grey */
    borderTop: '4px solid var(--primary-color)', /* Primary color blue */
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
};

export default LoadingSpinner;