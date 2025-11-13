// src/components/auth/RegisterForm.jsx

import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters.');
            return;
        }
        
        if (!formData.username || !formData.email || !formData.password) {
             setLocalError('All fields are required.');
             return;
        }

        onSubmit({ 
            username: formData.username, 
            email: formData.email, 
            password: formData.password 
        });
    };

    return (
        // Apply form container class for spacing
        <form onSubmit={handleSubmit} className="register-form-container">
            {localError && (
                <div className="alert-error">{localError}</div>
            )}
            
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your unique name"
                />
            </div>
            
            <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Minimum 6 characters"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm password"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
            >
                {/* Spinner logic for submitting state */}
                {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg className="spinner" style={{ marginRight: '12px', height: '20px', width: '20px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registering...
                    </span>
                ) : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;