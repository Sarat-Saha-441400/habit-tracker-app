// server/middleware/validationMiddleware.js
const { check, validationResult } = require('express-validator');

/**
 * Middleware function to check validation results.
 * If errors are present, it returns a 400 Bad Request response with error details.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    // If validation errors are found
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }
    
    // If no errors, continue to the next middleware/controller
    next();
};

// --- Validation Rules ---

/**
 * Validation rules for user registration.
 */
const registerValidation = [
    // Validate username
    check('username', 'Username is required').notEmpty().trim().escape(),

    // Validate email format
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),

    // Validate password length and content
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    
    // Custom check to confirm password (optional, but good practice)
    // You would need to ensure the request body includes a 'passwordConfirm' field
    // check('passwordConfirm', 'Passwords do not match').custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //         throw new Error('Password confirmation does not match password');
    //     }
    //     return true;
    // }),
    
    // Apply the general validation checker
    validate
];

/**
 * Validation rules for user login.
 */
const loginValidation = [
    // Validate email format
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),

    // Password presence check (we don't check complexity here, just presence)
    check('password', 'Password is required').exists(),
    
    // Apply the general validation checker
    validate
];

/**
 * Validation rules for creating a new habit.
 */
const habitValidation = [
    // Habit name is required and should not be empty
    check('name', 'Habit name is required').notEmpty().trim().escape(),

    // Frequency is optional but should be one of the allowed values if provided
    check('frequency', 'Invalid frequency value')
        .optional()
        .isIn(['daily', 'weekly', 'custom']),
        
    // Apply the general validation checker
    validate
];


module.exports = {
    registerValidation,
    loginValidation,
    habitValidation,
    // You can also export the 'validate' function if needed elsewhere
};