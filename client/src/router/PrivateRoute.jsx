// client/src/router/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * @description Renders child routes if the user is authenticated; otherwise, redirects to login.
 */
const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    
    // Show a basic loading message while the initial token/session check is running
    if (isLoading) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Loading user session...</div>;
    }

    // If authenticated, render the child component via Outlet
    // If not authenticated, redirect them to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;