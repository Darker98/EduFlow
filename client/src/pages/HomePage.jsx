import React, { Profiler } from "react";
import Layout from "../components/Layout";
import { CircleUser, Pi } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Cell, Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { setRoomId } from "@/redux/features/roomSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserPfpUrl } from "@/redux/features/userSlice";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  ChartTooltip
} from "@/components/ui/chart"

import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import RoomCards from "@/components/RoomCards";
import { setRoomData } from "@/redux/features/roomSlice";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setUserData } from "@/redux/features/userSlice";


const chartData = [
  { name: "Present", total: 40, color:"#1b8af3" },
  { name: "Absent", total: 30, color: "#f52424" },
  { name: "Leave", total: 12, color: "#e8f143" },
];

const chartConfig = {
  present: {
    label: "Present",
   
  },
  absent: {
    label: "Absent",
    
  },
  leave: {
    label: "Leave",
    
  }
};

const HomePage = () => {

  const {toast} = useToast();
  const dispatch = useDispatch();
  const {room_data} = useSelector((state) => state.room);
  const { user_data} = useSelector((state) => state.user)
  const {user_id} = useSelector((state) => state.user);
  const [roomName, setRoomName] = useState("");
  const [section, setSection] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([])
  const room_id = room_data?.id;
  const handleClear = (e) => {
    e.preventDefault();
    setRoomName("");
    setSection("");
    setEnrollmentKey("");
  };
  
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

useEffect(() => {
    async function getStudentAttendance(){
      try{
        console.log(room_id);
        const res = await axios.post("http://localhost:3000/attendance/summary",{
          student_id: user_data.id,
          room_id
        });
        if(res.data.success){
          setAttendanceData(res.data.data);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    if(user_data.role === 'student')
    getStudentAttendance();
  }, [])


useEffect(() => {
  async function getEnrollments(){
    try{
      const res = await axios.post("http://localhost:3000/enrollment/studentEnrollment",{
        student_id: user_data.id || user_id
      });
      if(res.data.success){
        setRooms(res.data.data);
      }
    }
    catch(err){
      console.log(err);
      
    }
  }
  if(user_data.role === 'student')
  getEnrollments();
}, []);


  const handleRoomEnrollment = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:3000/enrollment/enroll", {
        student_id: user_data?.id,
        enrollment_key: enrollmentKey
      });
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
      console.log(err);
      toast({
        title: "Error",
        description: err.response.data.message,
        variant:"destructive"
      })
    }
  }

  return (
 
    <div>
      <Layout pathname={"Home"}>
        <div >
          {user_data?.role === "instructor" ? ( <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <Dialog>
                  <DialogTrigger>
                    <TooltipTrigger>
                      <Button >
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                  </DialogTrigger>
                  <DialogContent className="w-[500px] ">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        Add Room
                      </DialogTitle>
                    </DialogHeader>
                    <div>
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
                    </div>
                  </DialogContent>
                </Dialog>
                <TooltipContent>Click to add a new room</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>) : (<div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <Dialog>
                  <DialogTrigger>
                    <TooltipTrigger>
                      <Button>
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                  </DialogTrigger>
                  <DialogContent className="w-[500px] ">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        Enroll in Room
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      <form className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                          <Label>Enter Enrollment Key</Label>
                          <Input
                            type="text"
                            value={enrollmentKey}
                            onChange={(e) => setEnrollmentKey(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-between">
                          <Button className="" onClick={(e) => handleClear(e)}>
                            Clear
                          </Button>
                          <Button onClick={(e) =>handleRoomEnrollment(e)} >
                            Enroll
                          </Button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                <TooltipContent>Click to add a new room</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>)}
         
          <div className="flex border rounded-lg gap-4 my-3 flex-wrap ">
            <div className=" flex w-full justify-between p-12 gap-10  text-2xl">
              <div className=" flex items-center gap-10 hover:cursor-pointer transition p-10">
                <div className="border flex h-[10rem] w-[18rem] rounded-full shadow-lg">
                 <img 
                 className="border rounded-full h-full w-full object-cover"
                 src={user_data?.pfp_url}
                 alt="user profile"
                 />
                </div>
                <div className="flex justify-center flex-col gap-6 ">
                  <p>{user_data?.role === 'instructor' ? (<span className="font-semibold">Instructor Name:</span>) : (<span className="font-semibold">Student Name:</span>)} {user_data?.first_name} {user_data?.last_name}</p>
                  <p><span className="font-semibold">User Name:</span> {user_data?.user_name}</p>
                  <p>{user_data?.role === 'instructor' ? (<span className="font-semibold">Instructor Id:</span>) : (<span className="font-semibold">Student Id:</span>)} {user_data?.id}</p>
                </div>
              </div>
              {user_data?.role === "student"  ? (
                attendanceData.length > 0 ? (
                  <Card className="border-hidden ">  
                <CardHeader>
                  <CardTitle className="text-center">Attendance Graph</CardTitle>
                </CardHeader>
                <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[300px] w-full "
                >
                  <PieChart data={attendanceData}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}/>
                    <Pie
                      data={attendanceData}
                      dataKey="total"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      label
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                </CardContent>
                <CardFooter className="flex justify-center ">
                  <div>
                    Attendance this month
                  </div>
                </CardFooter>
              </Card>
                )
                : (<div className="flex justify-center items-center h-[300px] w-full">
                  <p className="text-2xl">No Attendance Data Available</p>
                </div>)
              ) : null}
              
            </div>
            <div className="flex ml-20">
            <p className="text-xl font-semibold ">{user_data?.role === 'instructor' ? (<p>Current Rooms: </p>) : (<p>Enrolled Rooms:</p>)}</p>
            </div>

            <div className="flex p-6 w-full  justify-center flex-wrap gap-4">
              {rooms.length >0 ? rooms.map((room) => {
                  return (
                    <RoomCards key={room.id}
                    roomName={room.room_name}
                    sectionName={room.section_name}
                    room_id={room.id}
                    />
                  )
              }):<p className="text-2xl">No Rooms Available</p>}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
