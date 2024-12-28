import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserId } from "../redux/features/userSlice"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import axios from 'axios'

function Login() {
    const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-primary p-10 text-background lg:flex dark:border-r">
                <div className="relative z-20 flex items-center text-lg font-medium">
                  
                    EduFlow
                </div>
                <div className=" h-full flex flex-col justify-center items-center">
                <img
                        src="/eduflow_white.png"
                        alt="EduFlow Logo"
                        width={250}
                        height={250}
                        className=" mr-2 "
                    />
                    <p className="font-semibold">Where Tech Meets Education</p>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &copy; EduFlow
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="border-0 shadow-none lg:border lg:shadow-sm">
                        <CardHeader className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                            <p className="text-sm text-muted-foreground">
                                Enter your email to sign in to your account
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="text-sm">
                                    <Link
                                        href="/forgot-password"
                                        className="text-[#4F46E5] hover:text-[#4338CA]"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <Button onClick={handleSignIn} className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white">
                                Sign In
                            </Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                <FcGoogle className="mr-2" />
                                Google
                            </Button>
                            <div className="text-center text-sm">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-[#4F46E5] hover:text-[#4338CA]">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login;