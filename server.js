import express from "express";
import userRouter from "./server/routers/userRouter.js";
import cors from "cors";
import dotenv from "dotenv";

//Intialize dotenv
dotenv.config({path: "./.env"});

const app= express();
const port=3000;


//middleware
app.use(express.json()); 
app.use(cors({credentials:true, origin:'http://localhost:5173', allowedHeaders: 'Content-Type, Authorization', methods:'GET,HEAD,PUT,PATCH,POST,DELETE' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Base route for authentication
app.use('/auth', authRouter);

// Base route for profiles
app.use('/profile', profileRouter);

// Default route for unknown endpoints
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

