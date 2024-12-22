import React from "react";
import { ArrowDown, ClipboardList } from "lucide-react";
import { AArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {useState, useEffect} from 'react';
const classwork = [
  {
    icon: ClipboardList,
    name: "Assignment 1",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/12/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 2",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/11/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 3",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "2/12/2021",
    created_at: "12/12/2011",
  },
  {
    icon: ClipboardList,
    name: "Assignment 4",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/1/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 5",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/12/2021",
  },
];

const Classwork = () => {
  const {user_data} = useSelector((state) => state.user);
  const {room_data} = useSelector((state) => state.room);
  const {toast} = useToast();
  const [title, setTitle] = useState();
  const [maxmarks, setmaxMarks] = useState();
  const [details, setDetails] = useState();
  const [dueDate, setDueDate] = useState();
  const [setVisibleDate, setSetVisibleDate] = useState();
  const [file, setFile] = useState();

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try{
     const formData = new FormData();
      //appending the file to the form data
      formData.append('file', file);
      //appending the assignment details to the form data
      formData.append('assignmentDetails', JSON.stringify({title, maxmarks, details, dueDate, setVisibleDate}));
      //appending the room id to the form data
      formData.append('roomID', room_data.id);

      const res = await axios.post('http://localhost:3000/assignments/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(res.data.success){
        toast({
          title: 'Assignment Created',
          description: 'Assignment has been created successfully',
          variant: 'default'
        })
      }
    }
    catch(err){
      console.log(err);
      toast({
        title: 'Error',
        description: err.response.data.message,
        variant: 'destructive'
      })
    }
  }

  const handleClear = (e) => {
    e.preventDefault();
   
  };

  return (
    <Layout pathname={"Classwork"}>
      <div className="flex flex-col gap-4 mx-40 p-14 ">
        {user_data?.role === "instructor" && (
          <div>
            <Dialog>
              <DialogTrigger>
              <Button >Add Assignment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='text-2xl'>Add Assignment</DialogTitle>
                </DialogHeader>
                <div className="">
                <form onSubmit={handleAddAssignment} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                          <Label>Title</Label>
                          <Input
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Maximum Marks</Label>
                          <Input
                            type="number"
                            value={maxmarks}
                            required
                            onChange={(e) => setmaxMarks(e.target.value)} 
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Description</Label>
                          <Input
                            required
                            type="text"
                            
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Due Date</Label>
                          <Input
                            type="date"
                            value={dueDate}
                            required
                            onChange={(e) => setDueDate(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Visible Date</Label>
                          <Input
                            type="date"
                            value={setVisibleDate}
                            required
                            onChange={(e) => setSetVisibleDate(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Upload File</Label>
                          <Input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button className="" onClick={(e) => handleClear(e)}>
                            Clear
                          </Button>
                          <Button type = 'submit'>
                            Add Assignment
                          </Button>
                        </div>
                      </form>
                </div>
              </DialogContent>
            </Dialog>
         
        </div>)}
        
        <div className=" flex flex-col  gap-4 p-1 my-10">
          {classwork.map((item, index) => (
            <Collapsible
              key={index}
              className="hover:shadow-2xl transition duration-300 gap-5 border border-grey p-5 rounded-xl"
            >
              <div className=" flex justify-between ">
                <div className=" flex gap-4 items-center">
                  <div className="rounded-full border border-black p-2">
                    <item.icon />
                  </div>
                  <h1 className="text-xl font-bold">{item.name}</h1>
                </div>
                <CollapsibleTrigger>
                  <Button className="bg-white text-black hover:bg-slate-50 border">
                    <ArrowDown />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div>
                  <div className="p-5 flex gap-4">
                    <p>
                      <span className="font-semibold">Task Description: </span>
                      {item.Description}
                    </p>
                    <p>
                      <span className="font-semibold">Due Date: </span>
                      {item.due_date}
                    </p>
                  </div>
                  <span className="font-semibold p-5">Posted At: {item.created_at}</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Classwork;
