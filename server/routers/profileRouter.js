import express from 'express';
import {
    handleCreateProfile,
    handleGetProfile,
    handleUpdateProfile,
    handleDeleteProfile,
} from '../controllers/profileController.js';
import multer from "multer"

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

const router = express.Router();

// Route for creating a profile
router.post('/create', upload.single('pfpFile'), handleCreateProfile);

// Route for getting a profile
router.post('/get', handleGetProfile);

// Route for updating a profile
router.put('/update', handleUpdateProfile);

// Route for deleting a profile
router.post('/delete', handleDeleteProfile);

export default router;
