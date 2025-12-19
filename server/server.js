const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- CORS Configuration ---
// Note: origin: true allows any origin that sends a request. 
// This is safer for initial deployment testing than hardcoding localhost.
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// FIX: Only call app.listen() if NOT running on Vercel (local dev)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// FIX: REQUIRED for Vercel to recognize your Express app
module.exports = app;