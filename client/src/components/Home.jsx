import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { Clock, GraduationCap, BookOpen, Trophy } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { setRoomData } from "@/redux/features/roomSlice"
import { useSelector, useDispatch } from "react-redux"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

// Sample data for the activity graph
const activityData = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3.5 },
    { name: 'Wed', hours: 3 },
    { name: 'Thu', hours: 4 },
    { name: 'Fri', hours: 2.5 },
    { name: 'Sat', hours: 1.5 },
    { name: 'Sun', hours: 1 },
]

// Sample enrolled courses data
const enrolledCourses = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        instructor: "Dr. Sarah Johnson",
        progress: 75,
        lastAccessed: "2 hours ago",
    },
    {
        id: 2,
        name: "Advanced Mathematics",
        instructor: "Prof. Michael Chen",
        progress: 45,
        lastAccessed: "1 day ago",
    },
    {
        id: 3,
        name: "Digital Marketing Fundamentals",
        instructor: "Emily Rodriguez",
        progress: 90,
        lastAccessed: "5 hours ago",
    },
]

function Home() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const {user_data} = useSelector((state) => state.user);  
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()

useEffect(() => {
    async function getEnrollments(){
        try{
const res = await axios.post("http://localhost:3000/enrollment/studentEnrollment", {
    student_id: user_data.id
})
if(res.data.success){
    console.log(res);
    setRooms(res.data.data);
}
        }
        catch(err){
            console.log(err);
        }
    }
    if(user_data.role === 'student')
    getEnrollments()
}, [])

useEffect(() => {
    async function getRooms(){
      try{
        const res = await axios.post("http://localhost:3000/rooms/instructorRoom",{
          instructor_id:user_data?.id
        })
        if(res.data.success){
          setRooms(res.data.data);
        }
      }
      catch(err){
        console.log(err);
    
      }
    
    }
    if(user_data.role === 'instructor')
    getRooms();
      }, [user_data.id]);

    return (
        <div className="container py-6">
            {/* User Overview Section */}
            <div className="mb-8">
                <Card className="bg-gradient-to-r from-primary to-accent text-background">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-white/20">
                                    <AvatarImage src={user_data.pfp_url} alt="User" />
                                    <AvatarFallback>SK</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold">Welcome, {user_data.first_name} {user_data.last_name}!</h1>
                                    <p className="text-white/80">Student ID: {user_data.id}</p>
                                    <p className="text-white/80">@{user_data.user_name}</p>
                                </div>
                            </div>
                            <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
                                View Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 mb-8 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <BookOpen className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Enrolled Courese</p>
                                <h3 className="text-2xl font-bold">3</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Study Hours</p>
                                <h3 className="text-2xl font-bold">17.5</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg. Grade</p>
                                <h3 className="text-2xl font-bold">85%</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Achievements</p>
                                <h3 className="text-2xl font-bold">12</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Graph */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="hours"
                                    stroke="#655ee8"
                                    strokeWidth={2}
                                    dot={{ fill: '#4F46E5' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card>
                <CardHeader>
                    <CardTitle>{user_data?.role === "student" ? (<p>Enrolled Courese</p>) : (<p>Rooms Created</p>)}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="flex flex-col gap-4 rounded-lg border p-4 hover:bg-gray-50"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">{room.room_name}</h3>
                                        <p className="text-sm text-gray-500">Section: {room.section_name}</p>
                                    </div>
                                    <Button onClick={() => navigate(`/room/${room.id}`)} variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                                        {user_data?.role === "student" ? "Continue Learning" : "View Room"}
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Progress</span>
                                        <span className="font-medium">{room.progress}%</span>
                                    </div>
                                    <Progress value={room.progress} className="h-2" />
                                    <p className="text-xs text-gray-500">Last accessed {room.lastAccessed}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home;