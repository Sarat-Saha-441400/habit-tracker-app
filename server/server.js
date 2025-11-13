// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config(); 

// Connect to Database
connectDB(); 

const app = express();

// Middleware: Body Parser
// Allows the app to handle JSON data in request bodies
app.use(express.json());

// Routes
// Authentication routes
app.use('/api/auth', require('./routes/authRoutes'));
// Habit management routes
app.use('/api/habits', require('./routes/habitRoutes'));

// Simple root route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));