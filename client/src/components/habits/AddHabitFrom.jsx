import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useForm from '../../hooks/useForm'; 
import { useAuth } from '../../contexts/AuthContext'; 

const CATEGORIES = ['Morning', 'Work', 'Fitness', 'Evening', 'Study', 'General'];

const AddHabitForm = ({ onSubmit, isSubmitting }) => {
    // Get logged-in user details from Auth Context
    const { user } = useAuth(); 

    // Use custom hook for form state management
    const { values, handleChange, setValues } = useForm({
        title: '',
        description: '',
        category: CATEGORIES[0],
        reminderTime: '09:00',
        isPublic: false,
        imageFile: null, // For file objects
    });

    // Handle file changes separately
    const handleFileChange = (e) => {
        setValues({ ...values, imageFile: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!values.title || !values.description) {
            toast.error("Title and Description are required.");
            return;
        }

        // 1. Image Upload Logic (Conceptual: Simulate ImgBB upload)
        let imageUrl = '';
        if (values.imageFile) {
            // In a real app, this is where you'd upload the file via Axios 
            // to a service like ImgBB or S3 and get back the URL.
            // For now, we simulate success:
            imageUrl = 'https://placehold.co/400x200/4f46e5/ffffff?text=Habit+Image'; 
        }

        // 2. Prepare payload for API (excluding the file object)
        const payload = {
            title: values.title,
            description: values.description,
            category: values.category,
            reminderTime: values.reminderTime,
            isPublic: values.isPublic,
            imageUrl: imageUrl, // Pass the returned URL
        };

        // 3. Submit to parent handler (which calls HabitContext/API)
        onSubmit(payload);
    };

    // User details required for read-only fields
    const userName = user?.displayName || user?.username || 'Authenticated User';
    const userEmail = user?.email || 'N/A';

    return (
        <form onSubmit={handleSubmit} className="form-layout" style={formStyle}>
            
            <h3 style={sectionHeadingStyle}>User Information (Read-Only)</h3>
            <div style={readOnlyGroupStyle}>
                <div style={readOnlyFieldStyle}>
                    <label className="form-label">User Name:</label>
                    <input type="text" value={userName} disabled style={disabledInputStyle} />
                </div>
                <div style={readOnlyFieldStyle}>
                    <label className="form-label">User Email:</label>
                    <input type="email" value={userEmail} disabled style={disabledInputStyle} />
                </div>
            </div>

            <h3 style={sectionHeadingStyle}>Habit Details</h3>

            {/* Habit Title */}
            <div className="form-group">
                <label htmlFor="title" className="form-label">Habit Title</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={values.title} 
                    onChange={handleChange} 
                    required 
                    className="form-input" 
                    placeholder="E.g., Read for 30 minutes"
                />
            </div>

            {/* Description */}
            <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                    id="description" 
                    name="description" 
                    value={values.description} 
                    onChange={handleChange} 
                    required 
                    className="form-input" 
                    rows="3"
                    placeholder="Detailed explanation of the habit and its rules."
                />
            </div>

            {/* Category Dropdown & Reminder Time */}
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Category */}
                <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="category" className="form-label">Category</label>
                    <select 
                        id="category" 
                        name="category" 
                        value={values.category} 
                        onChange={handleChange}
                        className="form-input"
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Reminder Time Picker */}
                <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="reminderTime" className="form-label">Reminder Time</label>
                    <input 
                        type="time" 
                        id="reminderTime" 
                        name="reminderTime" 
                        value={values.reminderTime} 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                </div>
            </div>
            
            {/* Upload Image */}
            <div className="form-group">
                <label htmlFor="imageFile" className="form-label">Upload Image (Optional)</label>
                <input 
                    type="file" 
                    id="imageFile" 
                    name="imageFile" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="form-input"
                    style={{ paddingTop: '10px' }}
                />
            </div>

            {/* Is Public Checkbox */}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                    type="checkbox" 
                    id="isPublic" 
                    name="isPublic" 
                    checked={values.isPublic} 
                    onChange={handleChange} 
                    style={{ marginRight: '10px', width: 'auto' }}
                />
                <label htmlFor="isPublic" className="form-label" style={{ margin: 0, fontWeight: 'normal' }}>
                    Make this habit public for others to browse.
                </label>
            </div>


            <button type="submit" className="submit-button btn-primary" disabled={isSubmitting} style={buttonStyle}>
                {isSubmitting ? 'Saving Habit...' : 'Add Habit'}
            </button>
        </form>
    );
};

// --- Inline Styles for structure/readability ---
const formStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px' 
};
const sectionHeadingStyle = {
    fontSize: '1.2rem',
    color: 'var(--primary-color)',
    marginTop: '20px',
    marginBottom: '10px',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
};
const readOnlyGroupStyle = {
    display: 'flex', 
    gap: '20px',
    backgroundColor: 'var(--light-gray)',
    padding: '15px',
    borderRadius: '8px',
};
const readOnlyFieldStyle = { 
    flex: 1 
};
const disabledInputStyle = {
    backgroundColor: '#e9ecef', 
    color: '#6c757d', 
    cursor: 'not-allowed', 
    border: '1px solid #ced4da' 
};
const buttonStyle = {
    marginTop: '25px',
    backgroundColor: 'var(--success-color)', 
    color: 'white',
    // Inherits padding/size from .submit-button class defined in AuthStyles.css
};

export default AddHabitForm;