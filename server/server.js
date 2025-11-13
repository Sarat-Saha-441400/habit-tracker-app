const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // 1. Import CORS middleware

// Load environment variables from .env file
dotenv.config(); 

// Connect to Database
connectDB(); 

const app = express();

// --- CORS Configuration (Fixes the frontend request block) ---
const allowedOrigins = [
    'http://localhost:5173', // Allow your Vite client
    'http://127.0.0.1:5173', // Sometimes localhost resolves to this
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like Postman or local files)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS blocked request from unauthorized origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allows the client to send cookies and Authorization headers
};

app.use(cors(corsOptions)); // 2. Use CORS middleware before any routes

// Middleware: Body Parser (We must also add urlencoded for completeness)
// Allows the app to handle JSON data in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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