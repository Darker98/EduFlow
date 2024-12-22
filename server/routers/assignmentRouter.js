import express from 'express';
import {
    handleCreateAssignment,
    handleGetAssignments,
    handleDeleteAssignment,
    handleUpdateAssignment,
} from '../controllers/assignmentController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();

// Route to create an assignment
router.post('/create', upload.single('file'), handleCreateAssignment);

// Route to get assignments by room ID
router.post('/', handleGetAssignments);

// Route to delete an assignment
router.delete('/delete', handleDeleteAssignment);

// Route to update an assignment
router.put('/update', handleUpdateAssignment);

export default router;
