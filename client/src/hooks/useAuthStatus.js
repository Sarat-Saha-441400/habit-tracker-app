// client/src/hooks/useAuthStatus.js
import { useAuth } from '../contexts/AuthContext';

/**
 * @description Custom hook to quickly access authentication status and user info.
 * @returns {object} { isAuthenticated, user, isLoading }
 */
const useAuthStatus = () => {
    const { isAuthenticated, user, isLoading } = useAuth();
    
    return { isAuthenticated, user, isLoading };
};

export default useAuthStatus;