import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import '../../styles/AuthStyles.css';

const RegisterForm = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '', // Added explicitly
        email: '',
        photoURL: '', 
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (pwd) => {
        if (pwd.length < 6) return 'Password must be at least 6 characters.';
        if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter.';
        if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter.';
        return null; 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
             toast.error('Please fill in all required fields.');
             return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }
        
        // Pass the entire object to the parent's handler
        // Ensure username is populated if your backend requires it
        const submissionData = {
            ...formData,
            username: formData.username || formData.name.replace(/\s+/g, '').toLowerCase()
        };

        onSubmit(submissionData);
    };

    return (
        <form onSubmit={handleSubmit} className="register-form-container">
            <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="form-input" placeholder="Enter your full name"
                />
            </div>

            <div>
                <label htmlFor="username" className="form-label">Username (Optional)</label>
                <input
                    type="text" id="username" name="username"
                    value={formData.username} onChange={handleChange}
                    className="form-input" placeholder="Choose a unique username"
                />
            </div>
            
            <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="form-input" placeholder="you@example.com"
                />
            </div>
            
            <div>
                <label htmlFor="photoURL" className="form-label">Photo URL (Optional)</label>
                <input
                    type="text" id="photoURL" name="photoURL"
                    value={formData.photoURL} onChange={handleChange}
                    className="form-input" placeholder="Link to profile picture"
                />
            </div>

            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password" id="password" name="password" required
                    value={formData.password} onChange={handleChange}
                    className="form-input" 
                    placeholder="Min 6 chars, Uppercase & Lowercase"
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password" id="confirmPassword" name="confirmPassword" required
                    value={formData.confirmPassword} onChange={handleChange}
                    className="form-input" placeholder="Repeat your password"
                />
            </div>
            
            <button type="submit" disabled={isSubmitting} className="submit-button" style={{ marginTop: '25px' }}>
                {isSubmitting ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;