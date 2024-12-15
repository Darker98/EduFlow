import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useSelector } from "react-redux";

export function ProfileCard() {

    const {user_data} = useSelector((state) => state.user);

    return (
        <Card className="bg-gray-50 border-gray-200 mb-2">
            <CardContent className="flex items-center justify-center">
                <div className="flex flex-col sm:flex-row gap-2 items-center sm:gap-20 pt-10">
                    <div className="flex flex-col items-center p-10">
                        <Avatar className="w-32 h-32 mb-4">
                            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-semibold mb-2">{user_data?.first_name + user_data?.last_name}</h2>
                        <p className="text-gray-600 mb-4">{user_data?.role}</p>
                    </div>
                    <div className="w-full space-y-2">
                        <p><strong>Username:</strong> {user_data?.user_name}</p>
                        <p><strong>Email:</strong> {user_data?.email}</p>
                        <p><strong>First Name:</strong> {user_data?.first_name}</p>
                        <p><strong>Last Name:</strong> {user_data?.last_name}</p>
                        <p><strong>Role:</strong> {user_data?.role}</p>
                        <p><strong>Date of Birth:</strong> {user_data?.date_of_birth}</p>
                        <p><strong>Courses Enrolled:</strong> 3</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard;