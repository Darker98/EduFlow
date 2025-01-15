import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from 'axios'

export default function StudentAttendancePage() {
    const {user_data} = useSelector((state)=>state.user);
    const {room_data} = useSelector((state) =>state.room);
    const [attendanceData, setAttendanceData] = useState([]);
    const [totalPresents, setTotalPresents] = useState(0);
    const [totalAbsences, setTotalAbsences] = useState(0);
  
    useEffect(() => {
        async function fetchAttendanceData() {
            try{
                const res = await axios.post("http://localhost:3000/attendance/summary", {
                    student_id: user_data.id,
                    room_id: room_data.id
                })
                if(res.data.success){
                    setAttendanceData(res.data.data);
                   
                }
            }
            catch(err){
                console.log(err);
            }
        }
        if(user_data.role === "student")
        fetchAttendanceData();
    }, [])

    useEffect(() => {
        if (attendanceData.length > 0) {
            const presentCount = attendanceData.filter(record => record.attended).length;
            setTotalPresents(presentCount);
            setTotalAbsences(attendanceData.length - presentCount);
            
        }
    }, [attendanceData])

    return (
        <div className="container py-6">

            <Card>
                <CardHeader>
                    <CardTitle>Attendance Record</CardTitle>
                    <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-purple-600 h-2.5 rounded-full"
                                style={{ width: `${(totalPresents / attendanceData?.length) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                            {((totalPresents / attendanceData?.length) * 100).toFixed(2)}%
                        </span>
                    </TableCell>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData?.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.created_at}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${record.attended ? "bg-green-100 text-green-500" : "bg-red-100 text-red-800"
                                            }`}>
                                            {record.attended ? "Present" : "Absent"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}