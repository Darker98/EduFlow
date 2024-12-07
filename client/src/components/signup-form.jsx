import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = async ()=> {
    try{
      const res = await axios.post('http://localhost:3000/user/signup', {
        name: username,
        email,
        password
      })

      if(res.data.success){
        console.log(res.data.message);
        toast({
          title: res.data.message,
          description: "You can now login to your account",
          variant: "success",
        })
        navigate('/login');
      }
      
    }
    catch(err){
      toast({
        title: err.response.data.message,
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

    return (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  type="text"
                  required
                  value={username}
                  onChange = {(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Email</Label>
                </div>
                <Input  type="email" required 
                
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input  type="password" required 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" onClick={()=>handleSignUp()}>
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to='/login' className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      );
}

export default SignUp
