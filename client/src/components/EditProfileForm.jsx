import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import { setUserData } from "@/redux/features/userSlice";
import { useToast } from '@/hooks/use-toast'


export default function EditProfilePage() {
    const {toast} = useToast();
    const navigate = useNavigate();
    const {user_data} = useSelector((state) => state.user);
    const [user_name, setUserName] = useState(user_data?.user_name)
    const [email, setEmail] = useState(user_data?.email)
    const [first_name, setFirstName] = useState(user_data?.first_name)
    const [last_name, setLastName] = useState(user_data?.last_name)
    const [date_of_birth, setDateOfBirth] = useState(user_data?.date_of_birth)
    const dispatch = useDispatch()
    


    const handleUpdate = async () => {
        dispatch(setLoading());
        try{
        const res = await axios.put("http://localhost:3000/profile/update", {
            role:user_data?.role,
            id:user_data?.id,
            user_name,
            email,
            first_name,
            last_name,
            date_of_birth
        });
        dispatch(hideLoading());
        if(res.data.success){
            toast({
                title:"Success",
                description: "Profile updated successfully",
            });
            dispatch(setUserData(res.data.data));
            navigate("/profile");
        }

        }
        catch(err){
            dispatch(hideLoading());
            console.log(err);
            toast({
                title: "Error",
                description: err.response.data.message,
                variant:"destructive"
            })
        }
        }

 
    return (
        <div className="min-h-screen bg-white w-full">
            <main className="w-full ">
                <Card className="w-full bg-gray-50 border-gray-200">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-semibold">Update Your Information</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={user_name}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={date_of_birth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 mt-6">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

