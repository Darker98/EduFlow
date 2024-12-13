import express from 'express';
import { handleLogin, handleSignup, handleLogout } from '../controllers/authController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', handleSignup);

// Route for user login
router.post('/login', handleLogin);

// Route for user logout
router.get('/logout', handleLogout )

export default router;
