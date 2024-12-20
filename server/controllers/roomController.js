import { createRoom, getRoom, getRooms, updateRoom, deleteRoom } from '../models/roomModel.js';

export const handleCreateRoom = async (req, res) => {
    try {
        const roomDataFromFrontend = req.body;
        // Generate a random enrollment key
        const enrollment_key = generateRandomEnrollmentKey();

        // Combine frontend data with the generated enrollment key
        const roomData = { ...roomDataFromFrontend, enrollment_key };

        const data = await createRoom(roomData);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetRoom = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await getRoom(id);
        res.status(200).json({success: true, data});
    }
    catch(err){
        res.status(400).json({success: false, message: err.message});
    }
}

export const handleGetRooms = async (req, res) => {
    try {
        const { instructor_id } = req.body;
        const data = await getRooms(instructor_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUpdateRoom = async (req, res) => {
    try {
        const{room_id,...roomData}=req.body;
        const data = await updateRoom(roomData, room_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleDeleteRoom = async (req, res) => {
    try {
        const { id } = req.params; //changed from body to params
        await deleteRoom(id);
        res.status(200).json({ success: true, message: 'Room deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Helper function to generate a random enrollment key
const generateRandomEnrollmentKey = () => {
    const length = 8; // Length of the enrollment key
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        key += charset[randomIndex];
    }
    return key;
};
