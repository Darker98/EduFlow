import express from 'express';
import {
    handleCreateSession,
    handleGetSession,
    handleUpdateSession,
    handleDeleteSession,
    handleGetSessionsForRoom
} from '../controllers/sessionController.js';

const router = express.Router();

// Route to create a new session
router.post('/create', handleCreateSession);

// Route to get details of a specific session
router.post('/getSession', handleGetSession);

// Route to update session details
router.put('/update', handleUpdateSession);

// Route to delete a session
router.delete('/delete', handleDeleteSession);

// Route to get sessions for a specific room
router.post('/roomSessions', handleGetSessionsForRoom);

export default router;
