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
import { useDispatch } from "react-redux";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
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
import { NavLink } from "react-router-dom";
import {UploadComponent} from '@/components/UploadComponent'


const Classwork = () => {

  const getCurrentDate = () => {
    const date = new Date(); // Get the current date
    const year = date.getFullYear(); // Get the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (zero-padded)
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (zero-padded)
    return `${year}-${month}-${day}`; // Combine into yyyy-mm-dd format
  };


  const {user_data} = useSelector((state) => state.user);
  const {room_data} = useSelector((state) => state.room);
  const {toast} = useToast();
  const [title, setTitle] = useState();
  const [maxMarks, setmaxMarks] = useState();
  const [details, setDetails] = useState();
  const [dueDate, setDueDate] = useState();
  const [setVisibleDate] = useState(getCurrentDate());
  const [file, setFile] = useState();
  const [submissionFile, setSubmissionFile] = useState(); 
  const [assignments, setAsssignments] = useState([]);
  
  const dispatch = useDispatch();

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try{
    dispatch(setLoading());
     const formData = new FormData();
      //appending the file to the form data
      formData.append('file', file);
      //appending the assignment details to the form data
      formData.append('assignmentDetails', JSON.stringify({title, maxMarks, details, dueDate, setVisibleDate}));
      //appending the room id to the form data
      formData.append('roomID', room_data.id);
      
      const res = await axios.post('http://localhost:3000/assignments/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(hideLoading());
      if(res.data.success){
        toast({
          title: 'Assignment Created',
          description: 'Assignment has been created successfully',
          variant: 'default'
        })
      }
    }
    catch(err){
      dispatch(hideLoading());
      console.log(err);
      toast({
        title: 'Error',
        description: err.response.data.message,
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    async function getAssignments(){
      try{
        const res = await axios.post('http://localhost:3000/assignments/get', {
          roomID: room_data.id
        });
        if(res.data.success){
          setAsssignments(res.data.data);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    getAssignments();
  }, []);

  const handleClear = (e) => {
    e.preventDefault();
    setDetails('');
    setTitle('');
    setmaxMarks('');
    setDueDate('');
    setFile('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(submissionFile);
    e.preventDefault();
    try{
      dispatch(setLoading());
       const form_data = new FormData();
       form_data.append('file', files[0]); // Only handling a single file submission
  
       form_data.append('studentId', user_data.id);
        
        const res = await axios.post('http://localhost:3000/assignments/create', form_data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        dispatch(hideLoading());
        if(res.data.success){
          toast({
            title: 'Assignment Created',
            description: 'Assignment has been created successfully',
            variant: 'default'
          })
        }
      }
      catch(err){
        dispatch(hideLoading());
        console.log(err);
        toast({
          title: 'Error',
          description: err.response.data.message,
          variant: 'destructive'
        })
      }
  }

  return (
    <Layout pathname={"Classwork"}>
      <div className="flex flex-col gap-4 mx-40 p-14 ">
        
        {user_data?.role === "instructor" && (
          <div >
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
                            value={maxMarks}
                            required
                            onChange={(e) => setmaxMarks(e.target.value)} 
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Description</Label>
                          <Input
                            required
                            type="text"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
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
          {assignments.map((item, index) => (
            <Collapsible
              key={index}
              className="hover:shadow-2xl transition duration-300 gap-5 border border-grey p-5 rounded-xl"
            >
              <div className=" flex justify-between ">
                <div className=" flex gap-4 items-center">
                  <div className="rounded-full border border-black p-2">
                    <ClipboardList />
                  </div>
                  <h1 className="text-xl font-bold">{item.title}</h1>
                </div>
                <CollapsibleTrigger>
                  <Button className="bg-white text-black hover:bg-slate-50 border">
                    <ArrowDown />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div >
                  <div className="p-5 flex  justify-between gap-4">
                    <p>
                      <span className="font-semibold ">Task Description: </span>
                      {item.details}
                    </p>
                    <p>
                      <span className="font-semibold">Due Date: </span>
                      {item.due_date}
                    </p>
                  </div>
                  <div className="flex justify-between p-4 ">
                  <span className="font-semibold ">Posted At: {item.set_visible_at}</span>
                  <span className="font-semibold ">
                  <a target="new" href={item.assignment_url}>View Assignment</a>
                  </span>
                 
                  </div>
                 
                 <div>
                  {user_data?.role === 'student' && (
                      <Dialog>
                        <DialogTrigger>
                      <Button>Submit Assignment</Button>
                      </DialogTrigger>
                      <DialogContent >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <Input type='file'  onChange={(e) => setSubmissionFile(e.target.files[0])} />
                      <div className="flex justify-end">
                         
                          <Button type = 'submit'>
                            Add Assignment
                          </Button>
                        </div>
                        </form>
                      </DialogContent>
                      </Dialog>
                  )}
                 </div>

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
