import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileActions from "@/components/ProfileActions"

function Profile() {
    const {user_data} = useSelector(state => state.user);
    const dispatch = useDispatch(); 

    return (
        <div className="container py-10">
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="border-b border-[#E5E7EB] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user_data.pfp_url} alt="Profile Picture" />
                            <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">{user_data.first_name} {user_data.last_name}</h2>
                            <p className="text-sm text-gray-500">@{user_data.user_name}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="w-full">
                        <h3 className="font-semibold mb-2">{user_data.role === 'student'? (<span>Student Information</span>):(<span>Instructor Information</span>)}</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">{user_data.role === 'student'? (<span>Student ID</span>):(<span>Instructor ID</span>)}</span>
                                <span>{user_data.id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Username</span>
                                <span>@{user_data.user_name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">First Name</span>
                                <span>{user_data.first_name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Last Name</span>
                                <span>{user_data.last_name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Role</span>
                                <span>{user_data.role}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Date of Birth</span>
                                <span>{user_data.date_of_birth}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Email</span>
                                <span>{user_data.email}</span>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
            {/* Profile Actions Section */}
            <div className="max-w-4xl mx-auto pt-3">
                <ProfileActions />
            </div>
        </div>
    )
}


export default Profile;