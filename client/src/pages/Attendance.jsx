import React from "react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const studnets = [
  {
    studentId: "464215",
    name: "John Doe",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "464455",
    name: " Jane Doe",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "46125",
    name: " Batman",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "566124",
    name: "Marry Jane",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "561102",
    name: "Dostevosky",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "464215",
    name: "Young Thug",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "393123",
    name: "Cartel Member",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "49915",
    name: "Nigga man",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "464215",
    name: "John Doe",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "464215",
    name: "John Doe",
    classId: "CS101",
    attendance: "Present",
  },
  {
    studentId: "464215",
    name: "John Doe",
    classId: "CS101",
    attendance: "Present",
  },
];

const classes = [
  { value: "cs101", label: "CS101" },
  { value: "cs102", label: "CS102" },
  { value: "cs103", label: "CS103" },
  { value: "cs104", label: "CS104" },
];

const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const { pathname } = useLocation();

  const handleAttendance = ()=>{

  }

  return (
    <div>
      <Layout pathname={pathname}>
        
        <div>
          <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
            <h1>Student Attendance</h1>
          </div>
          <div className=" mb-3 w-[200px]  ">

          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
            {classes.map((classItem) => (
                <SelectItem value={classItem.value} key={classItem.value}>{classItem.label}</SelectItem>
              ))}
            </SelectContent>

          </Select>
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
                    Student Name
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Class Id
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Attendance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studnets.map((student) => (
                  <TableRow key={student.classId}>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell className="text-right">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Attendance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="leave">Leave</SelectItem>
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
