import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../common/Modal'; 
import useForm from '../../hooks/useForm'; 
// import { useHabits } from '../../contexts/HabitContext'; // For update API call

const CATEGORIES = ['Morning', 'Work', 'Fitness', 'Evening', 'Study', 'General'];

const UpdateHabitModal = ({ habit, onClose, onSave }) => {
    // const { updateHabit } = useHabits(); 
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form state using the current habit object
    const { values, handleChange, setValues } = useForm({
        title: habit.title,
        description: habit.description,
        category: habit.category,
        reminderTime: habit.reminderTime || '09:00',
        isPublic: habit.isPublic || false,
        imageFile: null, // For new file upload
        // Note: Read-only fields are displayed directly from 'habit' object
    });

    // Handle file changes
    const handleFileChange = (e) => {
        setValues({ ...values, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Image Upload Logic (Conceptual: Simulate ImgBB upload if new file exists)
            let newImageUrl = habit.imageUrl; // Keep old image URL by default
            if (values.imageFile) {
                // In a real app: upload new file and get URL here
                newImageUrl = 'https://new-uploaded-image-url.com/xyz'; 
            }

            // 2. Prepare payload for API
            const updatePayload = {
                title: values.title,
                description: values.description,
                category: values.category,
                reminderTime: values.reminderTime,
                isPublic: values.isPublic,
                imageUrl: newImageUrl, 
            };

            // 3. API Call: Update MongoDB
            // const updatedHabitData = await updateHabit(habit._id, updatePayload); 

            // Simulate the API returning the full updated habit data (including streak/dates)
            const updatedHabitData = { ...habit, ...updatePayload };
            
            // 4. Success: Update parent state and notify user
            onSave(updatedHabitData); // Updates the habit list in MyHabits.jsx
            toast.success(`Habit "${values.title}" updated successfully!`);
            onClose(); // Close the modal
            
        } catch (error) {
            toast.error(error.message || "Failed to update habit.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Edit Habit: ${habit.title}`}>
            <form onSubmit={handleSubmit} style={formStyle}>
                
                <h3 style={sectionHeadingStyle}>User Information (Read-Only)</h3>
                <div style={readOnlyGroupStyle}>
                    <div style={readOnlyFieldStyle}>
                        <label className="form-label">User Name:</label>
                        <input type="text" value={habit.userName || 'N/A'} disabled style={disabledInputStyle} />
                    </div>
                    <div style={readOnlyFieldStyle}>
                        <label className="form-label">User Email:</label>
                        <input type="email" value={habit.userEmail || 'N/A'} disabled style={disabledInputStyle} />
                    </div>
                </div>

                <h3 style={sectionHeadingStyle}>Habit Details</h3>

                {/* Habit Title */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Habit Title</label>
                    <input 
                        type="text" id="title" name="title" value={values.title} 
                        onChange={handleChange} required className="form-input" 
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        id="description" name="description" value={values.description} 
                        onChange={handleChange} required className="form-input" rows="3"
                    />
                </div>

                {/* Category Dropdown & Reminder Time */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label htmlFor="category" className="form-label">Category</label>
                        <select id="category" name="category" value={values.category} onChange={handleChange} className="form-input">
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label htmlFor="reminderTime" className="form-label">Reminder Time</label>
                        <input type="time" id="reminderTime" name="reminderTime" value={values.reminderTime} onChange={handleChange} required className="form-input" />
                    </div>
                </div>
                
                {/* Re-upload Image */}
                <div className="form-group">
                    <label htmlFor="imageFile" className="form-label">Re-upload Image (Current: {habit.imageUrl ? 'Yes' : 'No'})</label>
                    <input 
                        type="file" id="imageFile" name="imageFile" accept="image/*" 
                        onChange={handleFileChange} className="form-input"
                        style={{ paddingTop: '10px' }}
                    />
                </div>

                {/* Is Public Checkbox */}
                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                        type="checkbox" id="isPublic" name="isPublic" checked={values.isPublic} 
                        onChange={handleChange} style={{ marginRight: '10px', width: 'auto' }}
                    />
                    <label htmlFor="isPublic" className="form-label" style={{ margin: 0, fontWeight: 'normal' }}>
                        Make public
                    </label>
                </div>


                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '25px' }}>
                    <button type="button" onClick={onClose} className="btn-secondary" disabled={isLoading} style={cancelButtonStyle}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={saveButtonStyle}>
                        {isLoading ? 'Saving...' : 'Update Habit'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// --- Inline Styles (Copied from AddHabitForm for consistency) ---
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
    border: '1px solid #ced4da',
    padding: '10px',
    borderRadius: '4px'
};
const saveButtonStyle = {
    backgroundColor: 'var(--primary-color)', 
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none'
};
const cancelButtonStyle = {
    backgroundColor: '#ccc', 
    color: 'var(--text-color)',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none'
};

export default UpdateHabitModal;