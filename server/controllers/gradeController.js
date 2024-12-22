import { assignMarks, getMarks, updateMarks, deleteMarks } from '../models/gradeModel.js';

// Assign marks to a student for an assignment
export const handleAssignMarks = async (req, res) => {
    try {
        const { studentId, roomId, assignmentId, marks } = req.body;
        await assignMarks(studentId, roomId, assignmentId, marks);
        res.status(201).json({ success: true, message: 'Marks assigned successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Retrieve marks for a student for an assignment
export const handleGetMarks = async (req, res) => {
    try {
        const { studentId, roomId, assignmentId } = req.body;
        const marks = await getMarks(studentId, roomId, assignmentId);
        res.status(200).json({ success: true, data: marks });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update marks for a student for an assignment
export const handleUpdateMarks = async (req, res) => {
    try {
        const { studentId, roomId, assignmentId, newMarks } = req.body;
        const message = await updateMarks(studentId, roomId, assignmentId, newMarks);
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete marks for a student for an assignment
export const handleDeleteMarks = async (req, res) => {
    try {
        const { studentId, roomId, assignmentId } = req.body;
        const message = await deleteMarks(studentId, roomId, assignmentId);
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
