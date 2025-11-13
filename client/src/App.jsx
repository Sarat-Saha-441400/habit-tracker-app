import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers (FIXED: Added .jsx extension)
import { AuthProvider } from './contexts/AuthContext.jsx';
import { HabitProvider } from './contexts/HabitContext.jsx';

// Common Components (FIXED: Added .jsx extension)
import Navigation from './components/common/Navigation.jsx';
import Footer from './components/common/Footer.jsx';

// Routing Guard (FIXED: Added .jsx extension)
import PrivateRoute from './router/PrivateRoute.jsx';

// Pages (FIXED: Added .jsx extension)
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MyHabits from './pages/MyHabits.jsx';
import AddHabit from './pages/AddHabit.jsx';
import HabitDetails from './pages/HabitDetails.jsx';
import BrowsePublicHabits from './pages/BrowsePublicHabits.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {
    return (
        // Wrap the entire application in the AuthProvider
        <AuthProvider>
            <Router>
                <Navigation />
                <main className="container" style={{ minHeight: '80vh', padding: '20px 0' }}>
                    <Routes>
                        {/* -------------------- Public Routes -------------------- */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/browse" element={<BrowsePublicHabits />} />

                        {/* -------------------- Private Routes (Protected) -------------------- */}
                        {/* All routes nested within this Route use the PrivateRoute guard */}
                        <Route path="/" element={<PrivateRoute />}>
                            {/* Habits require the HabitProvider to access habit state/actions */}
                            <Route 
                                path="/my-habits" 
                                element={<HabitProvider><MyHabits /></HabitProvider>} 
                            />
                            <Route 
                                path="/add-habit" 
                                element={<HabitProvider><AddHabit /></HabitProvider>} 
                            />
                            <Route 
                                path="/habit/:id" 
                                element={<HabitProvider><HabitDetails /></HabitProvider>} 
                            />
                        </Route>

                        {/* -------------------- Fallback Route -------------------- */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;