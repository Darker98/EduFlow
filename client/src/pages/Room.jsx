import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { setRoomData } from "@/redux/features/roomSlice";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { setSessionId } from "@/redux/features/sessionSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { setAssignmentData } from "@/redux/features/assignmentSlice";


const Room = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session_id } = useSelector((state) => state.session);
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user_data } = useSelector((state) => state.user);
  const { room_data } = useSelector((state) => state.room);
  const {assignment_data} = useSelector((state)=> state.assignment);

  useEffect(() => {
    async function getRoom() {
      try {
        const res = await axios.get(
          `http://localhost:3000/rooms/getRoom/${id}`
        );
        if (res.data.success) {
          dispatch(setRoomData(res.data.data));
        }
      } catch (err) {
        toast({
          title: "Error",
          description: err?.response?.data?.message,
          variant: "destructive",
        });
      }
    }

    getRoom();
  }, []);

  const handleRoomDelete = async () => {
    try{
      dispatch(setLoading());
      const res = await axios.delete(`http://localhost:3000/rooms/deleteRoom/${id}`);
      dispatch(hideLoading());
      if(res.data.success){
        toast({
          title: "Success",
          description: "Room deleted successfully",
          variant: "default",
        });
        navigate("/home")
      }
    }
    catch(err){
      dispatch(hideLoading());
      console.log(err);
      toast({
        title: "Error",
        description: err?.response?.data?.message,
        variant: "destructive",
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
          dispatch(setAssignmentData(res.data.data));
        }
      }
      catch(err){
        console.log(err);
      }
    }
    getAssignments();
  }, [room_data]);

  const handleClear = (e) => {
    e.preventDefault();
    setStartingTime("");
    setEndingTime("");
  };

  const handleSessionCreation = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const res = await axios.post("http://localhost:3000/session/create", {
        start_time: startingTime,
        end_time: endingTime,
        room_id: id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast({
          title: "Success",
          description: "Session created successfully",
          variant: "default",
        });
        dispatch(setSessionId(res.data.data.id));
        navigate("/attendance");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      toast({
        title: "Error",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div>
        <Layout pathname={"Room"}>
          <div>
            {/* upper bar */}
            <div className="border ">
              <div className="flex justify-between items-center mx-12 p-5 ">
                <ul className="flex gap-10  text-xl font-semibold  text-slate-600 ">
                  <NavLink className="" to="">
                    Stream
                  </NavLink>
                  <NavLink to="/classwork">Classwork</NavLink>
                  {user_data?.role === "instructor" && (
                    <Dialog>
                    <DialogTrigger>
                      <button>Attendance</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a session</DialogTitle>
                      </DialogHeader>
                      <div>
                        <form className="flex flex-col gap-10">
                          <div className="flex flex-col gap-4">
                            <Label>Starting Time</Label>
                            <Input
                            required
                              type="time"
                              value={startingTime}
                              onChange={(e) => setStartingTime(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-4">
                            <Label>Ending Time</Label>
                            <Input
                              required
                              type="time"
                              value={endingTime}
                              onChange={(e) => setEndingTime(e.target.value)}
                            />
                          </div>

                          <div className="flex justify-between">
                            <Button onClick={(e) => handleClear(e)}>
                              Clear
                            </Button>
                            <Button onClick={handleSessionCreation}>
                              Create Session
                            </Button>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                  )}
                  {user_data?.role === "instructor" ? (
                    <NavLink to='/view-students'>View Students</NavLink>
                  ) : (
                  <>
                  <NavLink to='/view-instructor'>View Instructor</NavLink>
                  <NavLink to='/attendance-stats'>View Attendance</NavLink>
                  </>  
                  )}
                
                </ul>
                {user_data?.role === "instructor" && (
                  <div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div>
                      <Trash2 color="#fd2b2b" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your room and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRoomDelete}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                )}
                
              </div>
            </div>
            {/* upper bar */}
            {/* content */}
            <div className="mx-40 p-10">
              {/* banner */}
              <div
                className="border h-[250px] w-[1000px] flex flex-grow-0 items-end p-6 rounded-lg "
                style={{ background: "url(/banner.jpg)" }}
              >
                <div className="text-4xl text-white font-bold flex gap-4 flex-col">
                  <p>{room_data?.room_name}</p>
                  <p>{room_data?.section_name}</p>
                </div>
              </div>
              {/* banner */}

              {/* enrollment key display */}
              {user_data?.role === "instructor" && (
                <div className="flex gap-4 my-10 h-10 justify-center items-center">
                  <p className="text-lg font-semibold">Enrollment Key:</p>
                  <p className="text-lg">{room_data?.enrollment_key}</p>
                </div>
              )}
              {/* enrollment key display */}

              {/* classwork */}
              <div className=" flex flex-col gap-4  p-1 my-10">
                {assignment_data?.length > 0 ? assignment_data.map((work) => (
                  <div
                    key={work.due_date}
                    className="flex items-center hover:cursor-pointer hover:shadow-2xl transition duration-300 gap-5 border border-grey p-5 rounded-xl"
                  >
                    <div className="rounded-full border border-black p-2">
                      <ClipboardList />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">{work.title}</h1>
                      <div>
                        <p>Created At: {work.set_visible_at}</p>
                      </div>
                    </div>
                  </div>
                )) : ( user_data.role === 'instructor' ? <p className="font-semibold">Navigate to Classwork page to create assignments</p> : <p className="font-semibold">No Assignments yet</p>)}
              </div>
              {/* classwork */}
            </div>
            {/* content */}
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Room;
