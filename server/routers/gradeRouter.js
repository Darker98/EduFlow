import express from 'express';
import {
    handleAssignMarks,
    handleGetMarks,
    handleUpdateMarks,
    handleDeleteMarks,
    handleAllStudentsMarks,
    handleGetAllMarks
} from '../controllers/gradeController.js';

const router = express.Router();

router.post('/assign/all', handleAllStudentsMarks);

// Route to assign marks to a student for an assignment
router.post('/assign', handleAssignMarks);

// Route to retrieve marks for a student for an assignment
router.post('/retrieve', handleGetMarks);

router.post('/getall', handleGetAllMarks)

// Route to update marks for a student for an assignment
router.put('/update', handleUpdateMarks);

// Route to delete marks for a student for an assignment
router.delete('/delete', handleDeleteMarks);

export default router;
