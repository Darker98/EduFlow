import React, { Profiler } from "react";
import Layout from "../components/Layout";
import { CircleUser, Pi } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Cell, Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  ChartTooltip
} from "@/components/ui/chart"

import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import RoomCards from "@/components/RoomCards";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";

const chartData = [
  { name: "Present", total: 40, color:"#1b8af3" },
  { name: "Absent", total: 30, color: "#f52424" },
  { name: "Leave", total: 12, color: "#e8f143" },
];

const chartConfig = {
  present: {
    label: "Present",
   
  },
  absent: {
    label: "Absent",
    
  },
  leave: {
    label: "Leave",
    
  }
};

const HomePage = () => {
  const { user_data} = useSelector((state) => state.user)
  const {user_id} = useSelector((state) => state.user)
  const [className, setClassName] = useState("");
  const [roomNumber, setRoomNumber] = useState();
  const [section, setSection] = useState("");
  const navigate = useNavigate();
  const handleButtonClick = () => {};

  const handleClear = (e) => {
    e.preventDefault();
    setClassName("");
    setRoomNumber("");
    setSection("");
  };

  return (
    <div>
      <Layout pathname={"Home"}>
        <div className="  ">
          <div className="flex justify-end">
            <TooltipProvider>
              <Tooltip>
                <Dialog>
                  <DialogTrigger>
                    <TooltipTrigger>
                      <Button onClick={handleButtonClick}>
                        <Plus />
                      </Button>
                    </TooltipTrigger>
                  </DialogTrigger>
                  <DialogContent className="w-[500px] ">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        Add Class
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      <form className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                          <Label>Class Name</Label>
                          <Input
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label>Section</Label>
                          <Input
                            type="text"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button className="" onClick={(e) => handleClear(e)}>
                            Clear
                          </Button>
                          <Button onClick={() => navigate("/room")}>
                            Add Room
                          </Button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                <TooltipContent>Click to add a new class</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex border rounded-lg gap-4 my-3 flex-wrap ">
            <div className=" flex w-full justify-between p-12 gap-10  text-2xl">
              <div className=" flex items-center gap-10 hover:cursor-pointer transition p-10">
                <div className="border flex h-[13rem] w-[13rem] rounded-full shadow-lg">
                  <CircleUser
                    height={"13rem"}
                    width={"13rem"}
                    onClick={() => navigate("/profile")}
                  />
                </div>
                <div className="flex justify-center flex-col gap-6 ">
                  <p><span className="font-semibold">Student Name:</span> {user_data?.first_name} {user_data?.last_name}</p>
                  <p><span className="font-semibold">User Name:</span> {user_data?.user_name}</p>
                  <p><span className="font-semibold">Student Id:</span> {user_data?.id}</p>
                </div>
              </div>
              {user_data?.role === "student" ? (
                <Card className="border-hidden ">  
                <CardHeader>
                  <CardTitle className="text-center">Attendance Graph</CardTitle>
                </CardHeader>
                <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[300px] w-full "
                >
                  <PieChart data={chartData}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}/>
                    <Pie
                      data={chartData}
                      dataKey="total"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                </CardContent>
                <CardFooter className="flex justify-center ">
                  <div>
                    Attendance this month
                  </div>
                </CardFooter>
              </Card>
              ) : null}
              
            </div>

            <div className="flex p-6  justify-center flex-wrap gap-4">
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
              <RoomCards courseName={"Math"} instructorName={"Sarfaraz"} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
