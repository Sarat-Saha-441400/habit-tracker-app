import { useAuth } from '../contexts/AuthContext';

/**
 * @description Custom hook to quickly access authentication status and user info.
 * This simplifies component logic by consolidating state access from AuthContext.
 * @returns {object} { isAuthenticated, user, isLoading }
 */
const useAuthStatus = () => {
    // Retrieves necessary values directly from the AuthContext
    const { isAuthenticated, user, isLoading } = useAuth();
    
    return { isAuthenticated, user, isLoading };
};

export default useAuthStatus;