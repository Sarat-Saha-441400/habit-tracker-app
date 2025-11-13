import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import '../../styles/AuthStyles.css'; // For form styling

const RegisterForm = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        photoURL: '', 
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Password Validation Logic ---
    const validatePassword = (pwd) => {
        // Length must be at least 6 characters
        if (pwd.length < 6) return 'Password must be at least 6 characters.';
        // Must have an Uppercase letter
        if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter.';
        // Must have a Lowercase letter
        if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter.';
        return null; // Valid
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Check required fields
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
             toast.error('Please fill in all required fields (Name, Email, Password).');
             return;
        }

        // 2. Password Match Check
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        
        // 3. Password Complexity Check
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }
        
        // If all checks pass, submit the data to the parent component (Register.jsx)
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="register-form-container">
            {/* Name Field (Required for registration) */}
            <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="form-input" placeholder="Your full name"
                />
            </div>
            
            {/* Email Field (Required for registration) */}
            <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="form-input" placeholder="you@example.com"
                />
            </div>
            
            {/* photoURL Field (Optional for registration) */}
            <div>
                <label htmlFor="photoURL" className="form-label">Photo URL (Optional)</label>
                <input
                    type="text" id="photoURL" name="photoURL"
                    value={formData.photoURL} onChange={handleChange}
                    className="form-input" placeholder="Link to your profile picture"
                />
            </div>

            {/* Password Field (Required for registration) */}
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password" id="password" name="password" required
                    value={formData.password} onChange={handleChange}
                    className="form-input" 
                    placeholder="Min 6 chars, Uppercase & Lowercase required"
                />
            </div>

            {/* Confirm Password Field */}
            <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password" id="confirmPassword" name="confirmPassword" required
                    value={formData.confirmPassword} onChange={handleChange}
                    className="form-input" placeholder="Confirm password"
                />
            </div>
            
            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                style={{ marginTop: '25px' }}
            >
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