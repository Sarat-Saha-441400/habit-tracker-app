const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db'); // adjust path if needed

dotenv.config();
connectDB();

const app = express();

/**
 * CORS CONFIGURATION
 * IMPORTANT:
 * - No trailing slash in origin
 * - Allow Authorization header
 * - Handle preflight OPTIONS requests
 */
const corsOptions = {
  origin: [
    'https://habit-tracker-app-x7ry.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/habits', require('../routes/habitRoutes'));

// Health check route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running correctly'
  });
});

// Export for Vercel
module.exports = app;

/**
 * Local development server
 * (Vercel ignores this)
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
