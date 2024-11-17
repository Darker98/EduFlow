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


const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const {pathname} = useLocation();

  return (
    <div>
      <Layout pathname={pathname}>
        
        <div>
          <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
            <h1>Student Attendance</h1>
          </div>

          <div className="border">
            <Table>
              <TableCaption>List of students in the class.</TableCaption>
              <TableHeader>
                <TableRow className="text-lg  ">
                  <TableHead className="text-black font-bold">Student Id</TableHead>
                  <TableHead className="text-black font-bold">Student Name</TableHead>
                  <TableHead className="text-black font-bold">Class Id</TableHead>
                  <TableHead className="text-black font-bold">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {studnets.map((student) => (
                  <TableRow  key={student.classId}>
                    <TableCell >
                      {student.studentId}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell className="text-right">
                      <Select  >
                        <SelectTrigger >
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Attendance;
