import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- FIX: Link added here
import LoginForm from '../components/auth/LoginForm.jsx'; // Ensure .jsx extension is correct

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        // Redirect to a private page on successful login
        navigate('/my-habits');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register here</Link>
            </p>
        </div>
    );
};

export default Login;