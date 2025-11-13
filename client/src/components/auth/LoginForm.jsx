import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; 

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Client-side validation: Ensure fields are not empty
        if (!email || !password) {
            toast.error('Please enter both email and password.');
            setIsLoading(false);
            return;
        }

        try {
            // Attempt login via AuthContext (which calls API/handles token)
            await login(email, password);
            
            // Success: Show toast and trigger parent redirect
            toast.success('Login successful! Welcome back.'); 
            onLoginSuccess(); 
        } catch (err) {
            // Error handling from AuthContext/API call
            const errorMessage = err.message || String(err);
            toast.error(errorMessage); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
            
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

// Inline Styles (Consistent with previous definitions)
const formStyle = { display: 'flex', flexDirection: 'column' };
const inputStyle = { 
    padding: '12px', 
    margin: '10px 0', 
    border: '1px solid var(--border-color)', 
    borderRadius: '8px', 
    fontSize: '1em' 
};
const buttonStyle = { 
    padding: '12px', 
    margin: '15px 0 0', 
    background: 'var(--primary-color)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
};

export default LoginForm;