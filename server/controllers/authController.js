// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Note: This is imported but not used here, as hashing is in User.js pre-save hook.
const User = require('../models/User'); // Import the User model

/**
 * @desc Generate JWT
 * @param {string} id - The MongoDB ObjectId of the user
 * @returns {string} The signed JSON Web Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// ---------------------------------------------
// MISSING CONTROLLER FUNCTIONS
// ---------------------------------------------

/**
 * @route POST /api/auth/register
 * @desc Register new user
 * @access Public
 */
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        // Hashing handled by pre-save hook in User.js
        const user = await User.create({ username, email, password });

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id), 
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

/**
 * @route POST /api/auth/login
 * @desc Authenticate a user and get token
 * @access Public
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Retrieve user including password field (due to select: false in model)
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists AND if password matches (using method defined in User.js)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), 
        });
    } else {
        // Generic error message for security
        res.status(401).json({ message: 'Invalid credentials' });
    }
};


// ---------------------------------------------
// EXPORTS (FIXES THE ORIGINAL ERROR)
// ---------------------------------------------

module.exports = {
    registerUser,
    loginUser,
    generateToken, // Optional, but useful for testing/internal use
};