import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

// --- Conceptual Slider Data ---
const SLIDE_DATA = [
    { title: "Daily Consistency is Key.", description: "Small steps compound into massive success." },
    { title: "Visual Streaks for Motivation.", description: "Never break the chain and see your progress grow." },
    { title: "Join a Community of Builders.", description: "Explore public habits and find your inspiration." },
];

const Hero = () => {
    // Note: In a real implementation, a carousel library (like Swiper or React-Slick)
    // would be used here to handle slide state and transitions. We use a static map for structure.
    const currentSlide = SLIDE_DATA[0]; // Display the first slide statically

    return (
        <motion.header 
            className="hero-section" 
            style={heroStyle}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div style={contentWrapperStyle}>
                
                {/* SLIDER/BANNER CONTENT */}
                <motion.div 
                    key={currentSlide.title} // Key changes to force animation if slider logic were active
                    variants={containerVariants}
                    style={{ textAlign: 'center' }}
                >
                    <motion.h1 
                        style={h1Style}
                        variants={itemVariants}
                    >
                        {currentSlide.title}
                    </motion.h1>
                    
                    <motion.p 
                        style={pStyle}
                        variants={itemVariants}
                    >
                        {currentSlide.description}
                    </motion.p>
                </motion.div>
                
                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                    <Link to="/register" className="btn-primary" style={buttonStyleOverride}>
                        Start Your First Habit Free
                    </Link>
                </motion.div>
                
            </div>
        </motion.header>
    );
};

// --- Inline Styles (Uses global CSS variables) ---
const heroStyle = {
    padding: '80px 20px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    marginBottom: '40px',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};
const contentWrapperStyle = {
    maxWidth: '800px', 
    margin: '0 auto', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: '30px' 
};
const h1Style = { 
    fontSize: '3em', 
    marginBottom: '15px', 
    textAlign: 'center' 
};
const pStyle = { 
    fontSize: '1.2em', 
    marginBottom: '30px', 
    textAlign: 'center' 
};
// Override to ensure the CTA button matches the primary theme button style
const buttonStyleOverride = {
    textDecoration: 'none',
};

export default Hero;