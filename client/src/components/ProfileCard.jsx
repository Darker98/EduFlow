import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileCard({ user }) {
    return (
        <Card className="bg-gray-50 border-gray-200 mb-2">
            <CardContent className="flex items-center justify-center">
                <div className="flex flex-col sm:flex-row gap-2 items-center sm:gap-20 pt-10">
                    <div className="flex flex-col items-center p-10">
                        <Avatar className="w-32 h-32 mb-4">
                            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-semibold mb-2">{user.firstname + user.lastname}</h2>
                        <p className="text-gray-600 mb-4">{user.role}</p>
                    </div>
                    <div className="w-full space-y-2">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>First Name:</strong> {user.firstname}</p>
                        <p><strong>Last Name:</strong> {user.lastname}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Date of Birth:</strong> {user.dob}</p>
                        <p><strong>Courses Enrolled:</strong> 3</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard;