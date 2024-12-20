import express from 'express';
import { handleEnroll, handleGetEnrollments, handleUnenroll, handleGetStudents } from '../controllers/enrollmentController.js';

const router = express.Router();

// Route to enroll a student
router.post('/enroll', handleEnroll);

// Route to get enrollments of a specific student
router.post('/studentEnrollment', handleGetEnrollments); //made this a post request

// Route to unenroll a student from a room
router.delete('/unenroll', handleUnenroll);

// Route to get all students enrolled in a room
router.post('/students', handleGetStudents);

export default router;
