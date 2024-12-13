import express from 'express';
import dotenv from 'dotenv';
import authRouter from './server/routers/authRouter.js';
import profileRouter from './server/routers/profileRouter.js';

// Initialize environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Base route for authentication
app.use('/auth', authRouter);

// Base route for profiles
app.use('/profile', profileRouter);

// Default route for unknown endpoints
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

