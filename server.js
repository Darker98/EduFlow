import express from "express";
import userRouter from "./server/routers/userRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path:'./.env'})

const app= express();
const port=3000;

//middleware
app.use(express.json()); 
app.use(cors({credentials:true, origin:'http://localhost:5173', allowedHeaders: 'Content-Type, Authorization', methods:'GET,HEAD,PUT,PATCH,POST,DELETE' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user",userRouter);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
 
});
