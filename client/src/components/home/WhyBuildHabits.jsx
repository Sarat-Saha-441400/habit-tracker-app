import React from 'react';
import { FaTrophy, FaLightbulb, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Data for the 4 benefit cards (as required)
const reasons = [
    { 
        icon: <FaTrophy style={{ color: 'var(--accent-color)' }} />, 
        title: 'Achieve Consistency', 
        description: 'Small, repeated actions are the foundation of major long-term results. We help you never miss a day.' 
    },
    { 
        icon: <FaChartLine style={{ color: 'var(--primary-color)' }} />, 
        title: 'Visualize Progress', 
        description: 'Watch your daily streaks grow! Seeing tangible progress is the strongest motivator to keep going.' 
    },
    { 
        icon: <FaLightbulb style={{ color: '#4caf50' }} />, 
        title: 'Reduce Decision Fatigue', 
        description: 'Turn intentional actions into automatic routines, freeing up mental energy for complex tasks.' 
    },
    { 
        icon: <FaShieldAlt style={{ color: '#f44336' }} />, 
        title: 'Boost Accountability', 
        description: 'Publicly commit to goals (optional) and track performance, ensuring you stick to your plan.' 
    },
];

// Framer Motion Variants for Staggered Entrance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Stagger animation for cards
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WhyBuildHabits = () => {
    return (
        <motion.section 
            style={sectionStyle}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Animate when the section scrolls into view
            viewport={{ once: true, amount: 0.5 }} // Trigger only once when half visible
        >
            <h2 style={headingStyle}>Why Build Habits with HabitTracker?</h2>
            
            <motion.div style={gridStyle}>
                {reasons.map((item, index) => (
                    <motion.div 
                        key={index} 
                        style={cardStyle}
                        variants={cardVariants}
                    >
                        <div style={iconStyle}>{item.icon}</div>
                        <h3 style={cardTitleStyle}>{item.title}</h3>
                        <p>{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

// --- Inline Styles (Responsive by utilizing grid for layout) ---
const sectionStyle = { 
    padding: '60px 20px', 
    backgroundColor: 'white' 
};
const headingStyle = { 
    textAlign: 'center', 
    marginBottom: '40px', 
    fontSize: '2.5em', 
    color: 'var(--primary-color)' 
};
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
};
const cardStyle = {
    padding: '25px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#fcfcfc',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.05)',
    height: '100%', // Ensure equal height for cards
    display: 'flex',
    flexDirection: 'column',
};
const iconStyle = { 
    fontSize: '2.5em', 
    marginBottom: '15px' 
};
const cardTitleStyle = {
    marginBottom: '10px',
    color: 'var(--text-color)',
    fontSize: '1.2em',
    fontWeight: 'bold',
};

export default WhyBuildHabits;