// client/src/components/habits/HabitTable.jsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';

// Helper function (re-defined or imported from HabitCard)
const isCompletedToday = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return false;
    const todayString = new Date().toISOString().slice(0, 10);
    return completedDates.some(date => new Date(date).toISOString().slice(0, 10) === todayString);
};

const HabitTable = ({ habits, onToggleComplete, onDelete, onEdit }) => {
    return (
        <div className="habit-table-container" style={tableContainerStyle}>
            <table className="habit-table" style={tableStyle}>
                <thead>
                    <tr style={tableHeaderRowStyle}>
                        <th style={tableHeaderStyle}>Habit Name</th>
                        <th style={tableHeaderStyle}>Frequency</th>
                        <th style={tableHeaderStyle}>Streak</th>
                        <th style={tableHeaderStyle}>Status Today</th>
                        <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                                You have no habits yet!
                            </td>
                        </tr>
                    ) : (
                        habits.map((habit) => {
                            const completed = isCompletedToday(habit.completedDates);
                            
                            return (
                                <tr key={habit._id} style={tableRowStyle}>
                                    <td style={tableCellStyle}>{habit.name}</td>
                                    <td style={tableCellStyle}>{habit.frequency}</td>
                                    <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>
                                        {habit.currentStreak || 0} days
                                    </td>
                                    <td style={tableCellStyle}>
                                        <span style={{ color: completed ? 'var(--success-color)' : 'var(--danger-color)' }}>
                                            {completed ? <FaCheckCircle /> : <FaTimesCircle />}
                                            <span style={{ marginLeft: '5px' }}>{completed ? 'Complete' : 'Pending'}</span>
                                        </span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <button 
                                            onClick={() => onToggleComplete(habit._id)} 
                                            style={completed ? undoButtonStyle : doneButtonStyle}
                                        >
                                            {completed ? 'Undo' : 'Done'}
                                        </button>
                                        <button 
                                            onClick={() => onEdit(habit._id)} 
                                            style={editButtonStyle}
                                            title="Edit Habit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(habit._id)} 
                                            style={deleteButtonStyle}
                                            title="Delete Habit"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

// --- Inline Styles ---
const tableContainerStyle = { overflowX: 'auto' };
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
};
const tableHeaderRowStyle = { backgroundColor: 'var(--primary-color)', color: 'white' };
const tableHeaderStyle = { padding: '12px 15px', textAlign: 'left', fontSize: '1em' };
const tableRowStyle = { borderBottom: '1px solid #eee', transition: 'background-color 0.3s' };
const tableCellStyle = { padding: '12px 15px', fontSize: '0.95em', verticalAlign: 'middle' };

const actionButtonStyle = { 
    padding: '8px 12px', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontSize: '0.85em', 
    marginRight: '8px',
};
const doneButtonStyle = { 
    ...actionButtonStyle, 
    background: 'var(--success-color)', 
    color: 'white', 
    padding: '8px 12px' 
};
const undoButtonStyle = { 
    ...actionButtonStyle, 
    background: '#f0f0f0', 
    color: 'var(--text-color)', 
    padding: '8px 12px' 
};
const editButtonStyle = {
    ...actionButtonStyle,
    background: 'var(--accent-color)',
    color: 'black',
    padding: '8px',
};
const deleteButtonStyle = {
    ...actionButtonStyle,
    background: 'var(--danger-color)',
    color: 'white',
    padding: '8px',
};

export default HabitTable;