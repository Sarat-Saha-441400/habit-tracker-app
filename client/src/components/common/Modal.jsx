import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Icon for closing

const Modal = ({ isOpen, onClose, title, children }) => {
    // If the modal is not open, return null immediately
    if (!isOpen) return null;

    // Handle background click to close modal (optional behavior)
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        // Overlay/Backdrop
        <div style={overlayStyle} onClick={handleBackdropClick}>
            
            {/* Modal Content Container */}
            <div style={modalStyle} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                
                {/* Header Section */}
                <div style={headerStyle}>
                    <h3 id="modal-title" style={titleStyle}>{title}</h3>
                    <button onClick={onClose} style={closeButtonStyle} aria-label="Close modal">
                        <FaTimes />
                    </button>
                </div>
                
                {/* Body/Content Section */}
                <div style={bodyStyle}>
                    {children}
                </div>

            </div>
        </div>
    );
};

// --- Responsive Inline Styles ---

// 1. Overlay (Fixed position to cover the entire viewport)
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark, semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px', // Padding for small screens
};

// 2. Modal (The main content box)
const modalStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '600px', // Max width for desktop views
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    // Ensure content scrolls internally if too tall
    maxHeight: '90vh', 
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
};

// 3. Header
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
    marginBottom: '15px',
    flexShrink: 0, // Prevent shrinking when body scrolls
};
const titleStyle = { 
    margin: 0,
    fontSize: '1.5rem',
    color: 'var(--primary-color)',
};

// 4. Close Button
const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: '#666',
    transition: 'color 0.2s',
};
// Hover/Focus effect (conceptual, needs CSS for actual implementation)
// closeButtonStyle:hover { color: var(--danger-color); } 

// 5. Body (Content area with internal scrolling)
const bodyStyle = {
    overflowY: 'auto',
    flexGrow: 1, // Allow body to take remaining space
};

export default Modal;