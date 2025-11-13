// server/routes/habitRoutes.js
const express = require('express');
const { 
    getMyHabits, 
    createHabit, 
    updateHabit, 
    deleteHabit, 
    getPublicHabits, 
    markHabitComplete 
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware'); // Import JWT protection
const router = express.Router();

// All routes below require a valid JWT token (protection)
// GET /api/habits/my - Get all habits for the logged-in user
router.get('/my', protect, getMyHabits);

// POST /api/habits - Create a new habit
router.post('/', protect, createHabit);

// PUT /api/habits/:id - Update a habit
router.put('/:id', protect, updateHabit);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', protect, deleteHabit);

// PUT /api/habits/complete/:id - Mark habit as complete for today
router.put('/complete/:id', protect, markHabitComplete);

// Publicly accessible route for browsing
// GET /api/habits/public - Get all public habits
router.get('/public', getPublicHabits); 

module.exports = router;