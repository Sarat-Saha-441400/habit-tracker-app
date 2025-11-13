// client/src/components/home/WhyBuildHabits.jsx
import React from 'react';

const WhyBuildHabits = () => {
    const reasons = [
        { icon: '🎯', title: 'Achieve Consistency', description: 'Small steps every day lead to massive, compounding results over time.' },
        { icon: '📈', title: 'Visualize Progress', description: 'Our streak system keeps you motivated by showing your daily commitment.' },
        { icon: '🧠', title: 'Reduce Decision Fatigue', description: 'Automate your success by turning intentional actions into automatic routines.' },
    ];

    return (
        <section style={sectionStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2em' }}>Why Use a Habit Tracker?</h2>
            <div style={gridStyle}>
                {reasons.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <div style={iconStyle}>{item.icon}</div>
                        <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Inline Styles
const sectionStyle = { padding: '40px 0' };
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
};
const cardStyle = {
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
};
const iconStyle = { fontSize: '2.5em', marginBottom: '15px' };

export default WhyBuildHabits;