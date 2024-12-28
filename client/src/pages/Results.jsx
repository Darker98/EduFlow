import React from 'react'
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const students = [ {
  studentId:"464215",
  name:"Musa Riaz",
  course:"CS101",
  marks:"90",
  grade:"A"
},
{
  studentId:"263113",
  name:"Ibrahim Riaz",
  course:"CS101",
  marks:"60",
  grade:"B"
},
{
  studentId:"234215",
  name:"Musa Riaz",
  course:"CS101",
  marks:"80",
  grade:"A"
},
{
  studentId:"166211",
  name:"Buster Scrubs",
  course:"CS101",
  marks:"85",
  grade:"A"
},
{
  studentId:"781223",
  name:"Nikama Bacha",
  course:"CS101",
  marks:"90",
  grade:"A"
},
]

const Results = () => {

    const handleResult = (e) => {
        e.preventDefault();
    }

  return (
    <div>
      <Layout pathname={"Results"}>
        <div>
          <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
            <h1>Student Results</h1>
          </div>
          <div className=" mb-3 w-[200px]  ">

          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>

            </SelectContent>

          </Select>
            </div>
          
        <form onSubmit={handleResult}>
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
                    Course
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Marks
                  </TableHead>
                  <TableHead className="text-black font-bold">
                    Grade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.classId}>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell >
                      <Input type='number' max={100} min={0} value={student.marks}  />
                      </TableCell>
                      <TableCell>
                        {student.grade}
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
  )
}

export default Results;
