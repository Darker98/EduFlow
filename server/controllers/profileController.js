import { createProfile, getProfile, updateProfile, deleteProfile } from '../models/profileModel.js';

export const handleCreateProfile = async (req, res) => {
    try {
        const { role, ...profileData } = req.body; // Extract `role` and the rest of the profile data from `req.body`

        if(!role){
            throw new Error("Role is required.");
        }
        const data = await createProfile(profileData, role);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleGetProfile = async (req, res) => {
    try {
        const { id, role } = req.body;

        if(!role){
            throw new Error("Role is required.");
        }
        const data = await getProfile(id, role);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUpdateProfile = async (req, res) => {
    try {
        const { role, ...profileData } = req.body;  // Extract `role` and the rest of the profile data from `req.body`

        if(!role){
            throw new Error("Role is required.");
        }
        const data = await updateProfile(profileData, role);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleDeleteProfile = async (req, res) => {
    try {
        const { id, role } = req.body;

        if(!role){
            throw new Error("Role is required.");
        }
        await deleteProfile(id, role);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
