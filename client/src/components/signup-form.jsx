import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Email</Label>
                </div>
                <Input  type="email" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input  type="password" required />
              </div>
              <Button type="submit" className="w-full">
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
