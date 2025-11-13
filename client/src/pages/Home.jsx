import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/apiService';

// Components
import Hero from '../components/home/Hero'; 
import WhyBuildHabits from '../components/home/WhyBuildHabits'; 
import HabitCard from '../components/habits/HabitCard'; 
import LoadingSpinner from '../components/common/LoadingSpinner';

// --- Framer Motion Variants for Staggered Entrance ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, 
            delayChildren: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


// Placeholder Data structure for API simulation
const DUMMY_FEATURED_HABITS = [
    { _id: 'f1', name: 'Morning Pages', description: 'Write 3 pages every morning.', category: 'Morning', user: { username: 'Jane Writer' }, currentStreak: 5 },
    { _id: 'f2', name: '45 Min Workout', description: 'Hit the gym or exercise outdoors.', category: 'Fitness', user: { username: 'FitTracker' }, currentStreak: 12 },
    { _id: 'f3', name: 'No Social Media', description: 'Avoid scrolling until 10 AM.', category: 'Work', user: { username: 'Digital Detox' }, currentStreak: 20 },
    { _id: 'f4', name: 'Read 20 pages', description: 'Read a book, not news.', category: 'Study', user: { username: 'Bookworm' }, currentStreak: 8 },
    { _id: 'f5', name: 'Hydrate Check', description: 'Drink 8 glasses of water.', category: 'Morning', user: { username: 'WaterKing' }, currentStreak: 3 },
    { _id: 'f6', name: 'Budget Review', description: 'Check finances for 10 minutes.', category: 'Evening', user: { username: 'MoneyMaster' }, currentStreak: 15 },
];


const Home = () => {
    const [featuredHabits, setFeaturedHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedHabits = async () => {
            setLoading(true);
            try {
                // Fetch 6 newest public habits from the API 
                // Assumption: API endpoint handles sorting/limiting: /api/habits/public?sort=-createdAt&limit=6
                // const response = await api.get('/habits/public?sort=-createdAt&limit=6');
                // setFeaturedHabits(response.data);
                
                // Using dummy data placeholder:
                setFeaturedHabits(DUMMY_FEATURED_HABITS.slice(0, 6)); 
            } catch (error) {
                toast.error("Failed to load featured habits.");
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedHabits();
    }, []);

    // Placeholder function for View Details button
    const handleViewDetails = (id) => {
        // Since viewing details is a Private Route, the user will be redirected to login if unauthorized
        // This is handled by React Router, so we just navigate:
        // navigate(`/habits/${id}`);
        console.log(`Navigating to habit details for ID: ${id}`);
    };

    return (
        <motion.div 
            className="home-page container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ padding: '0 20px' }}
        >
            
            {/* 1. Hero Section (Animated via component wrapper) */}
            <motion.div variants={itemVariants}>
                <Hero />
            </motion.div>
            
            {/* 2. Featured Habits Section */}
            <motion.section variants={itemVariants} className="featured-habits" style={sectionStyle}>
                <h2 style={h2Style}><FaStar style={{ color: 'var(--accent-color)' }} /> Featured Public Habits</h2>
                <p style={pStyle}>Get inspiration from the newest goals set by the community.</p>
                
                {loading ? (
                    <LoadingSpinner message="Loading featured habits..." />
                ) : (
                    <div style={gridStyle}>
                        {featuredHabits.map(habit => (
                            <HabitCard 
                                key={habit._id} 
                                habit={habit} 
                                isPublicView={true}
                            >
                                <Link 
                                    to={`/habits/${habit._id}`} 
                                    onClick={() => handleViewDetails(habit._id)}
                                    className="btn-primary"
                                    style={{ ...featuredButtonStyle, marginTop: '15px' }}
                                >
                                    View Details
                                </Link>
                            </HabitCard>
                        ))}
                    </div>
                )}
            </motion.section>
            
            {/* 3. Why Build Habits Section */}
            <motion.div variants={itemVariants}>
                <WhyBuildHabits />
            </motion.div>

            {/* 4. Extra Section 1: Progress Tracking Demo */}
            <motion.section variants={itemVariants} style={extraSectionStyle}>
                <h2 style={h2Style}><FaChartLine style={{ color: 'var(--success-color)' }} /> Visualize Your Success</h2>
                <p style={pStyle}>Powerful analytics dashboard shows your streak growth, consistency, and weekly progress at a glance.</p>
                <Link to="/register" style={{ ...featuredButtonStyle, background: 'var(--success-color)', color: 'white' }}>
                    See Progress Demo <FaArrowRight style={{ marginLeft: '8px' }} />
                </Link>
            </motion.section>
            
            {/* 5. Extra Section 2: Join the Community */}
            <motion.section variants={itemVariants} style={extraSectionStyle}>
                <h2 style={h2Style}><FaUsers style={{ color: 'var(--primary-color)' }} /> Join Our Community</h2>
                <p style={pStyle}>Share your wins, find accountability partners, and participate in public challenges to stay motivated.</p>
                <Link to="/browse" style={featuredButtonStyle}>
                    Explore Public Habits <FaArrowRight style={{ marginLeft: '8px' }} />
                </Link>
            </motion.section>

        </motion.div>
    );
};

// --- Inline Styles ---
const sectionStyle = { padding: '40px 0', textAlign: 'center' };
const h2Style = { fontSize: '2.5em', marginBottom: '10px', color: 'var(--text-color)' };
const pStyle = { fontSize: '1.1em', color: '#666', marginBottom: '30px' };
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
    margin: '0 auto',
};
const extraSectionStyle = {
    padding: '60px 20px',
    margin: '40px 0',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
};
const featuredButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: 'var(--accent-color)',
    color: 'black',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
};


export default Home;