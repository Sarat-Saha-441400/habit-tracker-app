const express = require('express');
const cors = require('cors'); // 1. Added CORS
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 2. Configure CORS
// This allows your specific frontend to talk to this backend
app.use(cors({
    origin: 'https://habit-tracker-project-gold.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// IMPORTANT: Export for Vercel
module.exports = app;

// Local development listener
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}