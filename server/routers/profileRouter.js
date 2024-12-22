import express from 'express';
import {
    handleCreateProfile,
    handleGetProfile,
    handleUpdateProfile,
    handleDeleteProfile,
} from '../controllers/profileController.js';

const router = express.Router();

// Route for creating a profile
router.post('/create', handleCreateProfile);

// Route for getting a profile
router.get('/get', handleGetProfile);

// Route for updating a profile
router.put('/update', handleUpdateProfile);

// Route for deleting a profile
router.post('/delete', handleDeleteProfile);

export default router;
