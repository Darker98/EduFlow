import express from 'express';
import {
    handleMarkAttendance,
    handleGetAttendanceSummary,
    handleUpdateAttendance
} from '../controllers/attendanceController.js';

const router = express.Router();

// Route to mark attendance
router.post('/mark', handleMarkAttendance);

// Route to get attendance summary
router.post('/summary', handleGetAttendanceSummary);

// Route to update attendance
router.put('/update', handleUpdateAttendance);

export default router;
