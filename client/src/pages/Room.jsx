import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import {ClipboardList} from 'lucide-react'
import axios from 'axios'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { setRoomData } from "@/redux/features/roomSlice";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import {useSelector ,useDispatch } from "react-redux";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { setSessionId } from "@/redux/features/sessionSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const classWork = [{
  icon: ClipboardList,
  name: 'Assignment 1',
  Description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  due_date: '12/12/2021',
  created_at: '12/12/2021',
},
{
  icon: ClipboardList,
  name: 'Assignment 2',
  Description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  due_date: '12/12/2021',
  created_at: '12/12/2021',
},
{
  icon: ClipboardList,
  name: 'Assignment 3',
  Description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  due_date: '12/12/2021',
  created_at: '12/12/2021',
},
{
  icon: ClipboardList,
  name: 'Assignment 4',
  Description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  due_date: '12/12/2021',
  created_at: '12/12/2021',
},
{
  icon: ClipboardList,
  name: 'Assignment 5',
  Description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  due_date: '12/12/2021',
  created_at: '12/12/2021',
},


]

const Room = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session_id } = useSelector((state) => state.session);
  const [startingTime, setStartingTime] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const {user_data} = useSelector((state) => state.user);
  const {room_data} = useSelector((state) => state.room);

  useEffect(() => {
async function getRoom(){
  try{
  
  const res =await axios.get(`http://localhost:3000/rooms/getRoom/${id}`);
  console.log(res)
  if(res.data.success){
    dispatch(setRoomData(res.data.data));
  }
  }
  catch(err){
    toast({
      title: "Error",
      description: err?.response?.data?.message,
      variant:"destructive"
    })
  }
}

getRoom();
}, []);

const handleClear = (e) => {
e.preventDefault()
setStartingTime('');
setEndingTime('');
}

const handleSessionCreation = async (e) => {
  e.preventDefault();
try{
const res = await axios.post("http://localhost:3000/session/create", {
  start_time: startingTime,
  end_time: endingTime,
  room_id: id
});
if(res.data.success){
  toast({
    title:"Success",
    description:"Session created successfully",
    variant:"default"
  })
  console.log("session data ",res.data.data.id);
  dispatch(setSessionId(res.data.data.id));
  navigate("/attendance")
}
}
catch(err){
  console.log(err);
  toast({
    title: "Error",
    description: err?.response?.data?.message,
    variant:"destructive"
  })
}
}

  return (
    <>
      <div>
        <Layout pathname={"Room"}>
          <div>
            {/* upper bar */}
            <div className="border">
              <div>
                <ul className="flex gap-10 ml-40 text-xl font-semibold p-5 text-slate-600 ">
                  <NavLink className="" to="">
                    Stream
                  </NavLink>
                  <NavLink to="/classwork">Classwork</NavLink>
                  <Dialog>
                    <DialogTrigger>
                      <button >Attendance</button>
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
                            type="time"
                            value={startingTime}
                            onChange = {(e) => setStartingTime(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Ending Time</Label>
                          <Input
                            type="time"
                            value={endingTime}
                            onChange = {(e) => setEndingTime(e.target.value)}
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
                </ul>
              </div>
            </div>
            {/* upper bar */}
            {/* content */}
            <div className="mx-40 p-10">
              {/* banner */}
              <div className="border h-[250px] flex items-end p-6 rounded-lg " style={{background: 'url(/banner.jpg)'}}>
              <div className="text-4xl text-white font-bold flex gap-4 flex-col">
              <p>{room_data?.room_name}</p>
              <p>{room_data?.section_name}</p>
              </div>
              </div>
              {/* banner */}

              {/* enrollment key display */}
              {user_data?.role === 'instructor' && (
                <div className="flex gap-4 my-10 h-10 justify-center items-center">
                  <p className="text-lg font-semibold">Enrollment Key:</p>
                  <p className="text-lg">{room_data?.enrollment_key}</p>
                </div>
              )}
              {/* enrollment key display */}

              {/* classwork */}
              <div className=" flex flex-col gap-4  p-1 my-10">
                {classWork.map((work) => (
                  <div key={work.due_date} className="flex items-center hover:cursor-pointer hover:shadow-2xl transition duration-300 gap-5 border border-grey p-5 rounded-xl">
                    <div className="rounded-full border border-black p-2"><work.icon /></div>
                    <div>
                      <h1 className="text-xl font-bold">{work.name}</h1>
                      <div >
                      <p>Created At: {work.created_at}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
