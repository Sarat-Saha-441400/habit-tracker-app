// server/controllers/habitController.js
const Habit = require('../models/Habit');
const User = require('../models/User'); // Used for populating user info if needed
const { calculateStreak } = require('../utils/streakCalculator');

// Helper function to update/add the streak field to a habit object before sending it
const formatHabitWithStreak = (habit) => {
    // Convert Mongoose document to a plain object for modification
    const habitObj = habit.toObject ? habit.toObject() : habit; 
    
    // Calculate and add the streak
    habitObj.currentStreak = calculateStreak(habitObj.completedDates);
    
    return habitObj;
};

// ---------------------------------------------
// PRIVATE CONTROLLER FUNCTIONS (Require JWT protection)
// ---------------------------------------------

/**
 * @route POST /api/habits
 * @desc Create a new habit
 * @access Private
 */
const createHabit = async (req, res) => {
    const { name, description, frequency, isPublic } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Please include a habit name' });
    }

    try {
        const habit = await Habit.create({
            user: req.user.id, // ID injected by authMiddleware (protect)
            name,
            description,
            frequency,
            isPublic: isPublic || false,
        });

        res.status(201).json(formatHabitWithStreak(habit)); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to create habit', error: error.message });
    }
};

/**
 * @route GET /api/habits/my
 * @desc Get all habits for the logged-in user
 * @access Private
 */
const getMyHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });

        // Calculate streak for each habit before sending
        const habitsWithStreaks = habits.map(formatHabitWithStreak);

        res.status(200).json(habitsWithStreaks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch habits', error: error.message });
    }
};

/**
 * @route PUT /api/habits/complete/:id
 * @desc Mark a habit as completed for today (or unmark if already done)
 * @access Private
 */
const markHabitComplete = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit || habit.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Habit not found or not authorized' });
        }

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); 
        const todayString = today.toISOString().slice(0, 10);

        const completedDateStrings = habit.completedDates.map(date => date.toISOString().slice(0, 10));
        const index = completedDateStrings.indexOf(todayString);
        let newCompletedDates;

        if (index > -1) {
            // Unmark: filter the date out
            newCompletedDates = habit.completedDates.filter((_, i) => i !== index);
        } else {
            // Mark: add today's date and sort
            newCompletedDates = [...habit.completedDates, today].sort((a, b) => a - b);
        }

        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, {
            completedDates: newCompletedDates
        }, { new: true });
        
        // Respond with the updated habit and the *new* streak
        res.status(200).json(formatHabitWithStreak(updatedHabit));

    } catch (error) {
        res.status(500).json({ message: 'Error updating habit completion', error: error.message });
    }
};

/**
 * @route PUT /api/habits/:id
 * @desc Update a habit
 * @access Private
 */
const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit || habit.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Habit not found or not authorized' });
        }

        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(formatHabitWithStreak(updatedHabit));
    } catch (error) {
        res.status(500).json({ message: 'Failed to update habit', error: error.message });
    }
};

/**
 * @route DELETE /api/habits/:id
 * @desc Delete a habit
 * @access Private
 */
const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit || habit.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Habit not found or not authorized' });
        }

        await Habit.deleteOne({ _id: req.params.id }); 
        
        res.status(200).json({ id: req.params.id, message: 'Habit removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete habit', error: error.message });
    }
};


// ---------------------------------------------
// PUBLIC CONTROLLER FUNCTIONS
// ---------------------------------------------

/**
 * @route GET /api/habits/public
 * @desc Get all habits marked as public
 * @access Public
 */
const getPublicHabits = async (req, res) => {
    try {
        // Find public habits and populate the user's username
        const publicHabits = await Habit.find({ isPublic: true })
            .select('-completedDates') // Don't expose private completion history
            .populate('user', 'username'); // Only get the username field from the User model

        res.status(200).json(publicHabits);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch public habits', error: error.message });
    }
};

// ---------------------------------------------
// EXPORTS (FIXES THE ORIGINAL ERROR)
// ---------------------------------------------

module.exports = {
    createHabit,
    getMyHabits,
    updateHabit,
    deleteHabit,
    markHabitComplete,
    getPublicHabits,
};