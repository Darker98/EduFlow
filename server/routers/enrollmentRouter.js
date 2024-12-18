import express from 'express';
import { handleEnroll, handleGetEnrollments, handleUnenroll, handleGetStudents } from '../controllers/enrollmentController.js';

const router = express.Router();

// Route to enroll a student
router.post('/enroll', handleEnroll);

// Route to get enrollments of a specific student
router.get('/studentEnrollment', handleGetEnrollments);

// Route to unenroll a student from a room
router.delete('/unenroll', handleUnenroll);

// Route to get all students enrolled in a room
router.get('/students', handleGetStudents);

export default router;
