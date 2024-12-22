import express from 'express';
import {
    handleAssignMarks,
    handleGetMarks,
    handleUpdateMarks,
    handleDeleteMarks,
} from '../controllers/gradeController.js';

const router = express.Router();

// Route to assign marks to a student for an assignment
router.post('/assign', handleAssignMarks);

// Route to retrieve marks for a student for an assignment
router.post('/retrieve', handleGetMarks);

// Route to update marks for a student for an assignment
router.put('/update', handleUpdateMarks);

// Route to delete marks for a student for an assignment
router.delete('/delete', handleDeleteMarks);

export default router;
