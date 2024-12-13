import { login, signup } from '../models/authModel.js';

export const handleLogin = async (req, res) => {
    try {
        const credentials = req.body;
        const data = await login(credentials);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const handleSignup = async (req, res) => {
    try {
        const credentials = req.body;
        const data = await signup(credentials);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
