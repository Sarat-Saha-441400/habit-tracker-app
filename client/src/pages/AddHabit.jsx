// client/src/pages/AddHabit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '../contexts/HabitContext';
import useForm from '../hooks/useForm'; // Assumed custom hook

const AddHabit = () => {
    const navigate = useNavigate();
    const { addHabit } = useHabits();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { values, handleChange } = useForm({
        name: '',
        description: '',
        frequency: 'daily',
        isPublic: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await addHabit(values);
            navigate('/my-habits');
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Create New Habit 📝</h2>
            {error && <p style={{ color: 'var(--danger-color)' }}>Error: {error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Habit Name (e.g., Read 10 Pages)" 
                    value={values.name} 
                    onChange={handleChange} 
                    required 
                    disabled={isLoading}
                    style={inputStyle}
                />
                <textarea 
                    name="description" 
                    placeholder="Description (Optional)" 
                    value={values.description} 
                    onChange={handleChange} 
                    rows="3"
                    disabled={isLoading}
                    style={inputStyle}
                />
                <select name="frequency" value={values.frequency} onChange={handleChange} disabled={isLoading} style={inputStyle}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                </select>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                        type="checkbox" 
                        name="isPublic" 
                        checked={values.isPublic} 
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    Make Public (Allow others to see this habit for inspiration)
                </label>

                <button type="submit" disabled={isLoading} style={buttonStyle}>
                    {isLoading ? 'Adding Habit...' : 'Add Habit'}
                </button>
            </form>
        </div>
    );
};

const inputStyle = { padding: '10px', border: '1px solid #ddd', borderRadius: '4px' };
const buttonStyle = { padding: '12px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default AddHabit;