import { useEffect, useState } from "react"
import { Search, Users, Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { DialogTrigger } from "@radix-ui/react-dialog"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice"
import { useNavigate } from "react-router-dom"
import { setRoomData, setRoomId } from "@/redux/features/roomSlice"
import { useToast } from "@/hooks/use-toast"

function CoursesList() {
    const {room_data} = useSelector(state => state.room)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollmentKey, setEnrollmentKey] = useState("");
    const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
    const {user_data} = useSelector(state => state.user)
    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("");
    const [section, setSection] = useState("");
    const room_id = room_data?.id;
    const dispatch = useDispatch();
    const {toast} = useToast()
    const navigate = useNavigate()

useEffect(() => {
    async function fetchEnrolledRooms(){
        try{
            const res = await axios.post("http://localhost:3000/enrollment/studentEnrollment",{
                student_id:user_data?.id
            });
            if(res.data.success){
                setRooms(res.data.data);

            }
        }
        catch(err){
            console.log(err)
        }
    }
    if(user_data.role === "student")
    fetchEnrolledRooms();
}, []);

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

    const handleEnrollment = async (e) => {
        e.preventDefault();
        try{
            dispatch(setLoading()); 
          const res = await axios.post("http://localhost:3000/enrollment/enroll", {
            student_id: user_data?.id,
            enrollment_key: enrollmentKey
          });
          dispatch(hideLoading())
          if(res.data.success){
            console.log("res", res)
            toast({
              title: "Success",
              description: "Enrolled successfully",
              variant: "default"
            });
             navigate(`/room/${res.data.data.room_id}`);
          }
        }
        catch(err){
        dispatch(hideLoading())
          console.log(err);
          toast({
            title: "Error",
            description: err.response.data.message,
            variant:"destructive"
          })
        }
      }
    
      const handleRoomCreation =async () => {
        try{
        dispatch(setLoading());
        const res = await axios.post("http://localhost:3000/rooms/createRoom", {
          instructor_id:user_data?.id,
          room_name: roomName,
          section_name:section
        });
        dispatch(hideLoading());
        if(res.data.success){
          toast({
            title:"Success",
            description:"Room created successfully",
            variant:"default"
          });
        dispatch(setRoomId(res?.data?.data?.id));
        dispatch(setRoomData(res?.data?.data));
        navigate(`/room/${res.data.data.id}`);
        }
            }
            catch(err){
              dispatch(hideLoading())
              console.log(err);
              toast({
                title: "Error",
                description: err.response.data.message,
                variant:"destructive"
              })
            }
          }

    // Filter courses based on search query
    const filteredCourses = rooms.filter((course) =>
        course.room_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleClear = (e) => {
        e.preventDefault()
        setEnrollmentKey("");
        setRoomName("");
        setSection("");
    }

    return (
        <div className="container py-6">
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{user_data.role === 'student' ? (<span>Enrolled Courses</span>) : (<span>Current Rooms</span>)}</h1>
                        <p className="text-sm text-gray-500">{user_data.role === 'student' ? (<span>Browse and Enroll in Rooms</span>) : (<span>Create and Browse Rooms</span>)}</p>
                    </div>
                    <div className="relative flex gap-2 w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search rooms..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                <Button className="bg-primary hover:bg-button_hover rounded-lg">Add</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    {user_data.role === 'student' ? (
                                        <form onSubmit={handleEnrollment} className="flex flex-col gap-10">
                                        <div className="flex flex-col gap-4">
                                          <Label>Enrollment Key</Label>
                                          <Input
                                            type="text"
                                            value={enrollmentKey}
                                            onChange={(e) => setEnrollmentKey(e.target.value)}
                                          />
                                        </div>
                                    
                
                                        <div className="flex justify-between">
                                          <Button className="bg-primary hover:bg-button_hover" onClick={(e) => handleClear(e)}>
                                            Clear
                                          </Button>
                                          <Button className="bg-primary hover:bg-button_hover" type="submit">
                                            Add Room
                                          </Button>
                                        </div>
                                      </form>
                                    ) : (
                                        <form className="flex flex-col gap-10">
                                        <div className="flex flex-col gap-4">
                                          <Label>Room Name</Label>
                                          <Input
                                            type="text"
                                            value={roomName}
                                            onChange={(e) => setRoomName(e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                          <Label>Section</Label>
                                          <Input
                                            type="text"
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                          />
                                        </div>
                
                                        <div className="flex justify-between">
                                          <Button className="" onClick={(e) => handleClear(e)}>
                                            Clear
                                          </Button>
                                          <Button onClick={() => handleRoomCreation(`/room/${room_id}`)}>
                                            Add Room
                                          </Button>
                                        </div>
                                      </form>
                                    )}
                                
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="flex flex-col overflow-hidden ">
                            <CardHeader className="border-b p-0">
                                <div className="aspect-video relative">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        
                                        <h3 className="text-2xl font-semibold text-background">{course.room_name}</h3>
                                        <p className="text-lg text-background/80">{course.section_name}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-4">
                                <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{course.students} Students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className=" w-full flex justify-end">
                                        <Button onClick={() => navigate(`/room/${course.id}`)} className="bg-primary hover:to-button_hover">Visit Room</Button>
                                    </div>
                                </div>
                            </CardContent>
                           
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your search.</p>
                    </div>
                )}

                {/* Enrollment Dialog */}
              
            </div>
        </div>
    )
}

export default CoursesList;