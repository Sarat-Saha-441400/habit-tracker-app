// src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
// Import the custom CSS file
import '../styles/AuthStyles.css'; // Assuming this path

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [submissionError, setSubmissionError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async ({ username, email, password }) => {
        setSubmissionError(null);
        setIsSubmitting(true);
        try {
            await register(username, email, password);
            navigate('/my-habits');
        } catch (err) {
            // Ensure the error is converted to a string for display
            setSubmissionError(err.message || String(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Create Your Account</h2>
                
                {submissionError && (
                    <div className="alert-error" role="alert">
                        <span style={{ fontWeight: 600 }}>Registration Failed:</span> {submissionError}
                    </div>
                )}

                <RegisterForm 
                    onSubmit={handleFormSubmit} 
                    isSubmitting={isSubmitting} 
                />
                
                <p className="login-link-container">
                    Already have an account? 
                    <Link to="/login" className="login-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;