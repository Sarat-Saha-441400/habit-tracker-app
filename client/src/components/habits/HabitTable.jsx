import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt, FaEdit, FaBolt } from 'react-icons/fa';

// --- Helper Function ---
// Note: This logic needs to be robust (e.g., handling server-side timestamps)
const isCompletedToday = (completedDates) => {
    if (!completedDates || completedDates.length === 0) return false;
    const todayString = new Date().toISOString().slice(0, 10);
    // Assuming dates stored in DB are ISO strings
    return completedDates.some(date => new Date(date).toISOString().slice(0, 10) === todayString);
};

const HabitTable = ({ habits, onToggleComplete, onDelete, onEdit }) => {
    // Columns: Title, Category, Current Streak, Created Date, Actions

    return (
        <div className="habit-table-container" style={tableContainerStyle}>
            <table className="habit-table" style={tableStyle}>
                <thead>
                    <tr style={tableHeaderRowStyle}>
                        <th style={tableHeaderStyle}>Title</th>
                        <th style={tableHeaderStyle}>Category</th>
                        <th style={tableHeaderStyle}>Current Streak</th>
                        <th style={tableHeaderStyle}>Created Date</th>
                        <th style={{...tableHeaderStyle, textAlign: 'center'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                                You have no habits yet. <a href="/habits/add" style={{ color: 'var(--accent-color)' }}>Add one now!</a>
                            </td>
                        </tr>
                    ) : (
                        habits.map((habit) => {
                            const completed = isCompletedToday(habit.completedDates);
                            const createdDate = new Date(habit.createdAt || Date.now()).toLocaleDateString();
                            
                            return (
                                <tr key={habit._id} style={tableRowStyle}>
                                    <td style={{...tableCellStyle, fontWeight: 'bold', color: 'var(--primary-color)'}}>
                                        {habit.title}
                                    </td>
                                    <td style={tableCellStyle}>{habit.category}</td>
                                    <td style={tableCellStyle}>
                                        <FaBolt style={{ color: 'var(--accent-color)', marginRight: '5px' }} />
                                        {habit.currentStreak || 0} days
                                    </td>
                                    <td style={tableCellStyle}>
                                        {createdDate}
                                    </td>
                                    <td style={tableCellStyle}>
                                        
                                        {/* Mark Complete / Undo Button */}
                                        <button 
                                            onClick={() => onToggleComplete(habit._id, !completed)} 
                                            style={completed ? undoButtonStyle : doneButtonStyle}
                                            title={completed ? 'Undo Completion' : 'Mark Complete for Today'}
                                        >
                                            {completed ? <FaTimesCircle /> : <FaCheckCircle />}
                                            <span style={{ marginLeft: '5px', display: 'inline-block' }}>{completed ? 'Undo' : 'Done'}</span>
                                        </button>
                                        
                                        {/* Update Button (Opens Modal) */}
                                        <button 
                                            onClick={() => onEdit(habit)} 
                                            style={editButtonStyle}
                                            title="Edit Habit"
                                        >
                                            <FaEdit />
                                        </button>
                                        
                                        {/* Delete Button (Confirms before delete) */}
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

// --- Inline Styles (Responsive and Themed) ---
const tableContainerStyle = { 
    overflowX: 'auto',
    marginTop: '20px',
};
const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px', // Space between rows
    minWidth: '700px', // Responsive breakpoint hint
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: 'white',
};
const tableHeaderRowStyle = { 
    backgroundColor: 'var(--primary-color)', 
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.9em',
};
const tableHeaderStyle = { 
    padding: '12px 15px', 
    textAlign: 'left', 
};
const tableRowStyle = { 
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
};
const tableCellStyle = { 
    padding: '15px', 
    fontSize: '0.95em', 
    verticalAlign: 'middle',
    borderTop: '1px solid #f0f0f0',
    borderBottom: '1px solid #f0f0f0',
};

const actionButtonStyle = { 
    padding: '8px', 
    border: 'none', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontSize: '0.9em', 
    marginLeft: '8px',
    transition: 'background-color 0.2s, transform 0.1s',
};
const doneButtonStyle = { 
    ...actionButtonStyle, 
    background: 'var(--success-color)', 
    color: 'white', 
    padding: '8px 12px',
};
const undoButtonStyle = { 
    ...actionButtonStyle, 
    background: '#ccc', 
    color: 'var(--text-color)', 
    padding: '8px 12px',
};
const editButtonStyle = {
    ...actionButtonStyle,
    background: 'var(--accent-color)',
    color: 'black',
    padding: '8px 10px',
    marginLeft: '15px',
};
const deleteButtonStyle = {
    ...actionButtonStyle,
    background: 'var(--danger-color)',
    color: 'white',
};

export default HabitTable;