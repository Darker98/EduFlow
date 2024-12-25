import { createProfile, getProfile, updateProfile, deleteProfile } from '../models/profileModel.js';

export const handleCreateProfile = async (req, res) => {
    try {
        const { role, ...profileData } = req.body; // Extract `role` and the rest of the profile data from `req.body`

        const file = req.file;

        if (!role) {
            throw new Error("Role is required.");
        }
        const data = await createProfile(profileData, file, role);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//not using thhis function anywhere
export const handleGetProfile = async (req, res) => {
    try {
        const { id, role } = req.body;
        const {pfp_id} = req.body;

        if (!role) {
            throw new Error("Role is required.");
        }
        const data = await getProfile(id ,role, pfp_id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleUpdateProfile = async (req, res) => {
    try {
        const { role, ...profileData } = req.body;  // Extract `role` and the rest of the profile data from `req.body`

        if (!role) {
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

        if (!role) {
            throw new Error("Role is required.");
        }
        await deleteProfile(id, role);
        res.status(204).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
