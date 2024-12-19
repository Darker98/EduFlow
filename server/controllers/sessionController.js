import { createSession, getSession, updateSession, deleteSession, getSessions } from '../models/sessionModel.js';

export const handleCreateSession = async (req, res) => {
    try {
        const { room_id, ...sessionData } = req.body; 
        const data = await createSession(sessionData, room_id); 

        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetSession = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await getSession(id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const handleUpdateSession = async (req, res) => {
    try {
        const {session_id,...sessionData}=req.body;
        const data = await updateSession(sessionData, session_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleDeleteSession = async (req, res) => {
    try {
        const { session_id } = req.body;
        await deleteSession(session_id);
        res.status(200).json({ success: true, message: 'Session deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetSessionsForRoom = async (req, res) => {
    try {
        const { room_id } = req.body;
        const data = await getSessions(room_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
