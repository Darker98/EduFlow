import express from 'express';
import multer from 'multer';
import {
    handleUploadSubmission,
    handleGetSubmissionURL,
    handleCheckSubmissionStatuses,
    handleDeleteSubmission,
} from '../controllers/submissionController.js';

const router = express.Router();
const upload = multer(); // Configure multer for file upload handling

// Route to upload a submission
router.post('/upload', upload.single('file'), handleUploadSubmission);

// Route to get the URL of a submission
router.post('/url', handleGetSubmissionURL);

// Route to check the statuses of submissions for an assignment
router.post('/statuses', handleCheckSubmissionStatuses);

// Route to delete a submission
router.delete('/delete', handleDeleteSubmission);

export default router;
