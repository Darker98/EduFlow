import {
    createAssignment,
    getAssignments,
    deleteAssignment,
    updateAssignment,
} from '../models/assignmentModel.js';

export const handleCreateAssignment = async (req, res) => {
    try {
        // const { file, assignmentDetails, roomID } = req.body;
        const file = req.file // get the file from the request
        const assignmentDetails = JSON.parse(req.body.assignmentDetails) ;// parse the stringified JSON
        const roomID = req.body.roomID 
        console.log('assginement details', assignmentDetails)
        const assignmentID = await createAssignment(file, assignmentDetails, roomID);
        res.status(201).json({ success: true, message: 'Assignment created successfully', assignmentID });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetAssignments = async (req, res) => {
    try {
        const { roomID } = req.body;
        const assignments = await getAssignments(roomID);
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleDeleteAssignment = async (req, res) => {
    try {
        const { assignmentID } = req.body;
        await deleteAssignment(assignmentID);
        res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUpdateAssignment = async (req, res) => {
    try {
        const { assignmentID, updatedDetails } = req.body;
        const message = await updateAssignment(assignmentID, updatedDetails);
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
