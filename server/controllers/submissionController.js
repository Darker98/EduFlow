import {
    uploadSubmission,
    getSubmissionURL,
    checkSubmissionStatuses,
    deleteSubmission,
} from '../models/submissionModel.js';

export const handleUploadSubmission = async (req, res) => {
    try {
        const file = req.file; // get the file from the request
        const { studentID, assignmentID } = req.body;
        await uploadSubmission(studentID, assignmentID, file);
        res.status(201).json({ success: true, message: 'Submission uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetSubmissionURL = async (req, res) => {
    try {
        const { studentID, assignmentID } = req.body;
        const url = await getSubmissionURL(studentID, assignmentID);
        res.status(200).json({ success: true, data: url });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleCheckSubmissionStatuses = async (req, res) => {
    try {
        const { assignmentID } = req.body;
        const submissions = await checkSubmissionStatuses(assignmentID);
        res.status(200).json({ success: true, data: submissions });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleDeleteSubmission = async (req, res) => {
    try {
        const { studentID, assignmentID } = req.body;
        await deleteSubmission(studentID, assignmentID);
        res.status(200).json({ success: true, message: 'Submission deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};
