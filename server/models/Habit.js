// server/models/Habit.js
const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    user: {
        // Link habit to the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a habit name'],
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    frequency: {
        // e.g., 'daily', 'weekly', 'custom'
        type: String, 
        default: 'daily',
    },
    // Array to store the date (only date, not time) the habit was completed
    completedDates: {
        type: [Date],
        default: [],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Habit', HabitSchema);