import { React, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Cell, Pie, PieChart } from "recharts";
import Layout from "@/components/Layout";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltipContent,
    ChartTooltip
  } from "@/components/ui/chart"

const AttendanceStatistics = () => {
  const { user_data } = useSelector((state) => state.user);
  const {room_data} = useSelector((state) => state.room)
  const [attendanceData, setAttendanceData] = useState([]);

  const chartConfig = {
    present: {
      label: "Present",
    },
    absent: {
      label: "Absent",
    },
    leave: {
      label: "Leave",
    },
  };

  useEffect(() => {
    async function getStudentAttendance(){
      try{
        const res = await axios.post("http://localhost:3000/attendance/summary",{
          student_id: user_data.id,
          room_id:room_data.id
        });
        if(res.data.success){
          setAttendanceData(res.data.data);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    if(user_data.role === 'student')
    getStudentAttendance();
  }, [])

  return (
    <Layout>
      {user_data?.role === "student" ? (
        attendanceData.length > 0 ? (
          <Card className="border-hidden ">
            <CardHeader>
              <CardTitle className="text-center">Attendance Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[300px] w-full "
              >
                <PieChart data={attendanceData}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={attendanceData}
                    dataKey="total"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    label
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            
          </Card>
        ) : (
          <div className="flex justify-center items-center h-[300px] w-full">
            <p className="text-2xl">No Attendance Data Available</p>
          </div>
        )
      ) : null}
    </Layout>
  );
};

export default AttendanceStatistics;
