import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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


function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSignIn = async () =>{
    try{
  const res = await axios.post('http://localhost:3000/user/login', {
    email,
    password
  });
  if(res.data.status){
    console.log(res.data.message);
    toast({
      title: res.data.message,
      description: "Welcome back",
      type: "success"
    })
    navigate('/'); // Redirect to home page
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
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="mx-auto max-w-sm ">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Login</CardTitle>
        <CardDescription className='font-semibold'>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange = {(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="flex gap-2">
          <Button  type="submit" className="w-full" onClick={()=>handleSignIn()} >
            Login as Student
          </Button>
          <Button  type="submit" className="w-full" onClick={()=>handleSignIn()} >
            Login as Instructor
          </Button>
          </div>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
