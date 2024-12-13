import express from 'express';
import { handleLogin, handleSignup } from '../controllers/authController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', handleSignup);

// Route for user login
router.post('/login', handleLogin);

export default router;
