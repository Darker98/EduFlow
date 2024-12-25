import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserId } from "../redux/features/userSlice"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";

function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast({
          title: res?.data?.message,
          description: "Welcome back",
          type: "success"
        })
        dispatch(setUserId(res?.data?.data?.userId));
        if (res?.data?.data?.role === "student" || res?.data?.data?.role === "instructor") {
          dispatch(setUserId(res?.data?.data?.userId));
          dispatch(setUserData(res?.data?.data));
          navigate('/home');
        }
        else {
          navigate('/create/profile');
        }
      }

    }
    catch (err) {
      dispatch(hideLoading());
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
    <Card className="mx-auto max-w-sm  ">
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
              onChange={(e) => setEmail(e.target.value)}
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
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full" onClick={() => handleSignIn()} >
              Login
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
