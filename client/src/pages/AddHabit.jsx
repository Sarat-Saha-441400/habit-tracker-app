import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHabits } from '../contexts/HabitContext';
import AddHabitForm from '../components/habits/AddHabitFrom'
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const AddHabit = () => {
    const { addHabit } = useHabits();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handles the form submission logic from AddHabitForm.
     * Prepares the final payload and calls the global habit creation action.
     * @param {Object} formData - Data collected from the form inputs.
     */
    const handleCreateHabit = async (formData) => {
        setIsSubmitting(true);

        try {
            // Note on Image Upload: In a real app, logic for uploading imageFile 
            // to a service like ImgBB and getting the public URL would happen here.
            
            const habitPayload = {
                name: formData.name,
                description: formData.description,
                category: formData.category, 
                isPublic: formData.isPublic,
                reminderTime: formData.reminderTime,
                // Using a placeholder URL until actual image upload logic is implemented
                imageUrl: formData.imageFile ? 'placeholder-image-url.jpg' : null, 
                // The server uses the JWT token to identify the user ID
            };
            
            // Call context action to save to DB
            await addHabit(habitPayload);
            
            // Success: Toast is handled within HabitContext.js, but we navigate here.
            navigate('/habits'); 
            
        } catch (err) {
            // Error: Toast is handled within HabitContext.js or re-thrown here.
            console.error('Create habit error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
            {/* Link back to the My Habits Dashboard */}
            <Link to="/habits" style={linkStyle}>
                <FaArrowLeft style={{ marginRight: '8px' }} /> Back to My Habits
            </Link>

            <div style={cardStyle}>
                <h1 style={{ fontSize: '2em', marginBottom: '10px', color: 'var(--primary-color)' }}>Define Your New Goal</h1>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>Every journey starts with a single, clear step.</p>

                <AddHabitForm 
                    onSubmit={handleCreateHabit} 
                    isSubmitting={isSubmitting} 
                />
            </div>
        </div>
    );
};

// Inline Styles for consistency
const linkStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: '20px', 
    color: 'var(--primary-color)',
    fontWeight: '500',
    fontSize: '1em',
};

const cardStyle = {
    backgroundColor: 'white', 
    padding: '30px', 
    borderRadius: '12px', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
};

export default AddHabit;