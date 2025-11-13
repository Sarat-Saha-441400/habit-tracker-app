import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { HabitProvider } from './contexts/HabitContext'; 

// Router components
import PrivateRoute from './router/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyHabits from './pages/MyHabits';
import AddHabit from './pages/AddHabit';
import HabitDetails from './pages/HabitDetails';
import BrowsePublicHabits from './pages/BrowsePublicHabits';
import NotFound from './pages/NotFound';

// Components
import Header from './components/common/Header'; // Conditional Navbar
import Footer from './components/common/Footer';

function App() {
    return (
        <Router>
            {/* AuthProvider must wrap everything to manage global user state */}
            <AuthProvider>
                {/* HabitProvider needs Auth context, so it's nested inside */}
                <HabitProvider>
                    <div className="flex flex-col min-h-screen"> 
                        <Header /> 
                        <main className="flex-grow container mx-auto p-4">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/browse" element={<BrowsePublicHabits />} />

                                {/* Protected Routes: All children require authentication */}
                                <Route element={<PrivateRoute />}>
                                    {/* Using /habits as the base for the dashboard */}
                                    <Route path="/habits" element={<MyHabits />} /> 
                                    <Route path="/habits/add" element={<AddHabit />} />
                                    <Route path="/habits/:id" element={<HabitDetails />} />
                                </Route>
                                
                                {/* 404 Route (Catch-all) */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </HabitProvider>
            </AuthProvider>
            
            {/* Global Toast Container - Renders above all other content */}
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                theme="colored"
                newestOnTop={false}
            />
        </Router>
    );
}

export default App;