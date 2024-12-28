import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-primary p-10 text-background lg:flex dark:border-r">
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="EduFlow Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 mr-2"
                    />
                    EduFlow
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
                            <h2 className="text-2xl font-bold tracking-tight">Sign Up to Get Started</h2>
                            <p className="text-sm text-muted-foreground">
                                Enter your email to sign up to your account
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
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
                                />
                            </div>
                            <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white">
                                Sign Up
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
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#4F46E5] hover:text-[#4338CA]">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        </div >
    )
}

export default Signup;