import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ProfileActions from "@/components/ProfileActions"

function Profile() {
    return (
        <div className="container py-10">
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="border-b border-[#E5E7EB] bg-white p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
                            <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Mohammad Khalid</h2>
                            <p className="text-sm text-gray-500">@subhan</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="w-full">
                        <h3 className="font-semibold mb-2">Student Information</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Student ID</span>
                                <span>ae92d695-ef07-4a67-a1b1-48b3a7b5e683</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Username</span>
                                <span>@subhan</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">First Name</span>
                                <span>Mohammad</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Last Name</span>
                                <span>Subhan</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Role</span>
                                <span>Student</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Date of Birth</span>
                                <span>2024-12-25</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                                <span className="text-gray-500">Email</span>
                                <span>mohammad@example.com</span>
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