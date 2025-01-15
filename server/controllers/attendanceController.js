import { markAttendances, getAttendanceData, updateAttendance } from '../models/attendanceModel.js';

export const handleMarkAttendance = async (req, res) => {
    try {
        const { session_id, attendanceArray } = req.body;
        const data = await markAttendances(session_id, attendanceArray);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetAttendanceSummary = async (req, res) => {
    try {
        const { student_id, room_id } = req.body;
        const data = await getAttendanceData(student_id, room_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUpdateAttendance = async (req, res) => {
    try {
        const { session_id, attendanceArray } = req.body;
        const data = await updateAttendance(session_id, attendanceArray);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
