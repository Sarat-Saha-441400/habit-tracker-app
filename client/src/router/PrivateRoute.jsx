import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * @description A custom component that protects routes.
 * It checks authentication status: if logged in, it renders the child route 
 * via <Outlet />; otherwise, it redirects to the login page.
 */
const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    
    // 1. Show a Loading State while the initial authentication check is processed
    if (isLoading) {
        // This prevents flickering content while checking localStorage/token validity
        return <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2em'}}>
            Loading user session...
        </div>;
    }

    // 2. Check Authentication Status
    // If the user is authenticated, render the child route component
    if (isAuthenticated) {
        return <Outlet />;
    }

    // 3. If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;