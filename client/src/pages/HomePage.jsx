import React, { Profiler } from "react";
import Layout from "../components/Layout";
import HomeCards from "@/components/HomeCards";
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { User } from "lucide-react";
const HomePage = () => {

  const [className, setClassName] = useState('');
  const [roomNumber, setRoomNumber] = useState();
  const [section, setSection] = useState('');
  const navigate = useNavigate();
  const handleButtonClick = ()=>{
    
  }

  const handleClear = (e)=>{
    e.preventDefault();
    setClassName('');
    setRoomNumber('');
    setSection('');
  }

  return (
    <div >
      <Layout pathname={"Home"}>
        <div className="  ">
          <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
                <Popover >
                  <PopoverTrigger>
              <TooltipTrigger>
                  <Button onClick = {handleButtonClick}>
                  <Plus />
                </Button>
              </TooltipTrigger>
                  </PopoverTrigger>
                  <PopoverContent className= 'w-[500px]' >
                    <div>
                      <form className="flex flex-col gap-10" >

                      <div className="flex flex-col gap-4">
                        <Label>Class Name</Label>
                        <Input type="text" value={className} onChange={(e)=>setClassName(e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label>Room Number</Label>
                        <Input type="number" value={roomNumber} onChange= {(e)=>setRoomNumber(e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label>Section</Label>
                        <Input type="text" value={section} onChange={(e)=>setSection(e.target.value)}/>
                      </div>

                      <div className="flex justify-between">
                        <Button onClick={()=>navigate('/room')}>
                          Add Class
                        </Button>
                        <Button className='' onClick={(e)=>handleClear(e)}>Clear</Button>
                      </div>
                      </form>
                    </div>
                    </PopoverContent>
                </Popover>
              <TooltipContent>Click to add a new class</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          <HomeCards content={<User height={'6rem'} width={'6rem'}/>} title={"Profile"} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
