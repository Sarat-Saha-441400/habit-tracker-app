import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        // Redirect to /habits (MyHabits route) on successful login
        navigate('/habits'); 
    };

    const handleGoogleLogin = async () => {
        // Implement Google Login logic here (Conceptual)
        toast.info("Google login feature is conceptual.");
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            
            {/* The LoginForm component handles its own login logic and toast messages */}
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            
            <button
                type="button"
                style={{ width: '100%', padding: '10px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                onClick={handleGoogleLogin}
            >
                Sign in with Google
            </button>

            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register here</Link>
            </p>
        </div>
    );
};

export default Login;