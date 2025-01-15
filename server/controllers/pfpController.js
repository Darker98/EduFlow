import { uploadProfilePicture, getProfilePictureUrl } from "../models/pfpModel.js";

export const handleUploadProfilePicture = async (req, res) => {
    try{
        const {file, userId, role} = req.body;
        console.log(req.body);
        if(!file || !userId || !role){
            throw new Error("Missing required fields");
        }
        const url = await uploadProfilePicture(file, userId, role);
        res.status(200).json({
            success: true,
            data: url
        })
    }
    catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}

export const handleGetProfilePictureUrl = async (req, res) => {
    try{
        const {userId, role} = req.body;
        if(!userId || !role){
            throw new Error("Missing required fields");
        }
        const url = await getProfilePictureUrl(userId, role);
        res.status(200).json({
            success: true,
            data: url
        })
    }
    catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}