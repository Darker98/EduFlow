import express from 'express';
import { handleCreateRoom, handleGetRoom, handleGetRooms, handleUpdateRoom, handleDeleteRoom } from '../controllers/roomController.js';

const router = express.Router();

// Route to create a room
router.post('/createRoom', handleCreateRoom);

//rout to get a room based on the room id provided from the frontend
router.get('/getRoom/:id', handleGetRoom);

// Route to get rooms for a specific instructor
router.post('/instructorRoom', handleGetRooms);

// Route to update a room's details
router.put('/updateRoom', handleUpdateRoom);

// Route to delete a room
router.delete('/deleteRoom', handleDeleteRoom);

export default router;
