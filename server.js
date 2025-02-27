import express from "express";
import authRouter from "./server/routers/authRouter.js";
import profileRouter from "./server/routers/profileRouter.js";
import attendanceRouter from "./server/routers/attendanceRouter.js";
import sessionRouter from "./server/routers/sessionRouter.js";
import roomRouter from "./server/routers/roomRouter.js";
import enrollmentRouter from "./server/routers/enrollmentRouter.js";
import assignmentRouter from './server/routers/assignmentRouter.js';
import gradeRouter from './server/routers/gradeRouter.js';
import submissionRouter from './server/routers/submissionRouter.js';
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

app.use('/attendance', attendanceRouter);

app.use('/session', sessionRouter);

app.use('/rooms', roomRouter);

app.use('/enrollment', enrollmentRouter);

// Base route for profiles
app.use('/profile', profileRouter);


app.use('/rooms',roomRouter);
app.use('/enrollment',enrollmentRouter);

app.use('/assignments', assignmentRouter); 
app.use('/grades', gradeRouter);

app.use('/submission',submissionRouter);

// Default route for unknown endpoints
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

