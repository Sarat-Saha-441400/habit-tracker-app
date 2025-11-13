// client/src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            onLoginSuccess(); // Redirect to /my-habits
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
            {error && <p style={errorStyle}>{error}</p>}
            
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={inputStyle}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={inputStyle}
            />
            <button type="submit" disabled={isLoading} style={buttonStyle}>
                {isLoading ? 'Signing In...' : 'Login'}
            </button>
        </form>
    );
};

// Inline Styles
const formStyle = { display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { 
    padding: '10px', 
    margin: '15px 0 0', 
    background: 'var(--primary-color)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer' 
};
const errorStyle = { color: 'var(--danger-color)', textAlign: 'center', marginBottom: '10px' };

export default LoginForm;