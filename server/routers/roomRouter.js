import express from 'express';
import { handleCreateRoom, handleGetRooms, handleUpdateRoom, handleDeleteRoom } from '../controllers/roomController.js';

const router = express.Router();

// Route to create a room
router.post('/createRoom', handleCreateRoom);

// Route to get rooms for a specific instructor
router.post('/instructorRoom/:id', handleGetRooms); //made this a post request, each room will have an id and instructor_id will be sent in the body so thats why made it a post request

// Route to update a room's details
router.put('/updateRoom', handleUpdateRoom);

// Route to delete a room
router.delete('/deleteRoom', handleDeleteRoom);

export default router;
