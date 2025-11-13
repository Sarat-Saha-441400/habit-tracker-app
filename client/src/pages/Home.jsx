// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero'; // Assumed component
import WhyBuildHabits from '../components/home/WhyBuildHabits'; // Assumed component

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            
            <section style={{ margin: '40px auto', maxWidth: '800px', textAlign: 'center' }}>
                <h2>Ready to Start Tracking?</h2>
                <p style={{ margin: '20px 0' }}>
                    Join thousands who are transforming their lives one habit at a time.
                </p>
                <Link to="/register" style={{ padding: '12px 25px', background: 'var(--success-color)', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Sign Up Now
                </Link>
            </section>
            
            <WhyBuildHabits />
        </div>
    );
};

export default Home;