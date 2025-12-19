const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Simplest CORS setup for Express
app.options('*', cors()); 

app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}