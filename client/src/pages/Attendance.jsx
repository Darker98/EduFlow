import React from "react";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import axios from 'axios'
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Attendance = () => {
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
        console.log(res.data.data)
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


  return (
    <div>
      <Layout pathname={"Attendance"}>
        
        <div>
          <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
            <h1>Student Attendance</h1>
          </div>
     
        <form onSubmit={handleAttendance}>
          <div className="">
            <Table>
              <TableCaption>List of students in the class.</TableCaption>
              <TableHeader>
                <TableRow className="text-lg  ">
                  <TableHead className="text-black font-bold">
                    Student Id
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Student 
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Attendance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendancesData.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{attendance.id}</TableCell>
                    <TableCell>
                      <div className="flex gap-4 flex-col">
                        <div className="h-16 w-16 border ">
                        <img  className="h-16 w-16  bg-cover border shadow-lg" src={attendance.pfp_url} alt="picture" />
                        </div>
                        <div className="mx-2">
                        {attendance.first_name} {attendance.last_name}
                        </div>
                      </div>
                      </TableCell>
                    <TableCell className="text-right">
                      <Select onValueChange={value=>onSelect(attendance.id, value)} >
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
            <div className=" flex my-5 justify-end ">
            <Button className = 'w-[200px]'>Submit</Button>
          </div>  
          </div>
         
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Attendance;
