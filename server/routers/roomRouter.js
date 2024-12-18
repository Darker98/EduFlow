import express from 'express';
import { handleCreateRoom, handleGetRooms, handleUpdateRoom, handleDeleteRoom } from '../controllers/roomController.js';

const router = express.Router();

// Route to create a room
router.post('/createRoom', handleCreateRoom);

// Route to get rooms for a specific instructor
router.get('/instructorRoom', handleGetRooms);

// Route to update a room's details
router.put('/updateRoom', handleUpdateRoom);

// Route to delete a room
router.delete('/deleteRoom', handleDeleteRoom);

export default router;
