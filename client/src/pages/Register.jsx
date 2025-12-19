// Register.jsx - UPDATED
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';
import '../styles/AuthStyles.css'; 

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            // FIX: Pass the whole object, not individual strings
            await register(formData); 
            
            toast.success('Registration successful!');
            navigate('/habits');
        } catch (err) {
            // Error is already toasted in the AuthContext, but you can log it here
            console.error("Registration failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleGoogleLogin = () => {
        toast.info("Google login feature is conceptual.");
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Create Your Account</h2>
                <RegisterForm 
                    onSubmit={handleFormSubmit} 
                    isSubmitting={isSubmitting} 
                />
                <button
                    type="button"
                    className="submit-button"
                    style={{ backgroundColor: '#db4437', marginTop: '10px' }}
                    onClick={handleGoogleLogin}
                >
                    Sign up with Google
                </button>
                <p className="login-link-container">
                    Already have an account? 
                    <Link to="/login" className="login-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;