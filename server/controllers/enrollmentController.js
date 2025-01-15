import { enroll, getEnrollments, unenroll, getStudents } from '../models/enrollmentModel.js';

export const handleEnroll = async (req, res) => {
    try {
        const { student_id, enrollment_key } = req.body;
        const data = await enroll(student_id, enrollment_key);
        res.status(201).json({ success: true, data });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetEnrollments = async (req, res) => {
    try {
        const { student_id } = req.body;
        const data = await getEnrollments(student_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUnenroll = async (req, res) => {
    try {
        const { student_id, room_id } = req.body;
        await unenroll(student_id, room_id);
        res.status(200).json({ success: true, message: 'Unenrolled successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetStudents = async (req, res) => {
    try {
        const { room_id } = req.body;
        const data = await getStudents(room_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
