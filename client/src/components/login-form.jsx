import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

  const handleSignIn = async (e) =>{
    e.preventDefault();
    try{
  const res = await axios.post('http://localhost:3000/user/login', {
    email,
    password
  }, {withCredentials: true});
  if(res.data.status){
    console.log(res.data.message);
    navigate('/'); // Redirect to home page
  }
    }
    catch(err){
      console.log(err);
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
          <Button  type="submit" className="w-full" >
            Login
          </Button>
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
