import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice"
import axios from 'axios'

function InstructorAttendance() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();
    const {session_id} = useSelector((state) => state.session); 
    const [attendance, setAttendance] = useState();
    const [attendancesData, setAttendancesData] = useState([]);
    const {room_data} = useSelector((state) => state.room);
    const [attendanceArray, setAttendanceArray] = useState([]);

    useEffect(() => {
        async function getData(){
          const res = await axios.post('http://localhost:3000/enrollment/students', {
            room_id:room_data.id
          });
          if(res.data.success){
            setAttendancesData(res.data.data);
            setAttendanceArray(res.data.data.map((attendance)=>({student_id:attendance.id, attended:attendance.attended})))
          }
        }
        getData();
      }, []);


      const handleAttendance = async (e)=>{
        e.preventDefault();
        try{
          dispatch(setLoading());
          const res = await axios.post('http://localhost:3000/attendance/mark',{
            session_id,
            attendanceArray 
          });
          dispatch(hideLoading());
          if(res.data.success){
            toast({
              title:"Success",
              description:"Attendance marked successfully",
              variant:"default"
            })
           navigate(`/room/${room_data.id}`);
          }
        }
        catch(err){
          dispatch(hideLoading());
          console.log(err);
          toast({
            title:"Error",
            description:err?.response?.data?.message,
            variant:"destructive"
          })
        }
      }

      const onSelect = (id,value)=>{
        setAttendanceArray(pre=>pre.map((attendance)=>{
          if(attendance.student_id === id){
            return {...attendance, attended:value=='true'?true:false}
          }
          return attendance;
        }))
      }



    // const handleAttendanceChange = (studentId, sessionId, value) => {
    //     // Update attendance logic here
    //     console.log(`Student ${studentId} attendance for session ${sessionId} set to ${value}`)
    // }

    return (
        <div className="container py-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Mark Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <Select value={selectedSession} onValueChange={setSelectedSession}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select session" />
                        </SelectTrigger>
                        <SelectContent>
                            {sessions.map((session) => (
                                <SelectItem key={session.id} value={session.id}>
                                    Session - {session.date} - {session.time}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}

                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Present</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendancesData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.first_name} {student.last_name}</TableCell>
                                    <TableCell className="w-1/4">
                                        <Select onValueChange={value=>onSelect(student.id, value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Attendance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={'true'}>Present</SelectItem>
                                                <SelectItem value={'false'}>Absent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Button onClick={handleAttendance} className="w-full bg-purple-600 hover:bg-purple-700">Save Attendance</Button>
        </div>
    )
}

export default InstructorAttendance;