
import bcrypt from "bcrypt";
import Users from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const saltRounds=10;


//signup logic
export const signup = async (req,res)=>{
   
    try{
        const { name, email, password } = req.body;
        const userExists= Users.some(user=> user.email===email);
        if(userExists){
            return res.status(400).send({message : 'You already have an account'});
            
        }
    
        const hashedPassword= await bcrypt.hash(password,saltRounds);
    
        const newUser={name, email, password : hashedPassword};
        Users.push(newUser);

        console.log(hashedPassword);
        
         return res.status(201).send({message : 'User created successfully'});

    }
    catch{
        res.status(500).send();
    }
};

//login logic

export const login = async (req,res)=> {

    const {email, password}= req.body;


    //find user in the array
    const foundUser = Users.find(user => user.email === email);
    if(!foundUser){
        return res.status(400).send({message : 'User not found'});
    }


    try{
        
        //compare the passwords
    const isMatch= await bcrypt.compare(password,foundUser.password);
    if(!isMatch){
        return res.status(400).json({ message: 'Invalid password' });
    }

    //if the user is authneticated correctly, then an access token is generated
    const accessToken=jwt.sign({email: foundUser.email, name : foundUser.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1h'});
     res.status(200).json({ message: 'Login successful' , accessToken});
    }

    catch{
        res.status(500).send();
    }

};



