import express from "express";
import userRouter from "./server/routers/userRouter.js";


const app= express();
const port=3000;


//middleware
app.use(express.json()); 



app.use("/user",userRouter);



app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
 
});
