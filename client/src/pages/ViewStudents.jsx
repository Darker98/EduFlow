import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";


const ViewStudents = () => {
  const dispatch = useDispatch();
  const { room_data } = useSelector((state) => state.room);
  const [students, setStudents] = useState([]);
  const { user_data } = useSelector((state) => state.user);
  const {toast} = useToast();
  useEffect(() => {
    async function getStudents() {
      try {
        const res = await axios.post(
          "http://localhost:3000/enrollment/students",
          {
            room_id: room_data.id,
          }
        );
        if (res.data.success) {
          setStudents(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getStudents();
  }, []);

  const handleKickStudent = async () => {
    try{
    dispatch(setLoading());
    const res = await axios.post('http://localhost:3000/enrollment/unenroll', {
        student_id: user_data.id,
        room_id: room_data.id
    });
    dispatch(hideLoading())
    if(res.data.success){
        setStudents(students.filter((student) => student.id !== user_data.id));
        toast({
            title:"Success",
            description:"Student unenrolled successfully",
            variant:"default"
        })
    }
}
    catch(err){
      dispatch(hideLoading());
        console.log(err); 
        toast({
            title:"Error",
            description: err.response.data.message,
            variant:"destructive"
        })
    }
  } 

  return (
    <Layout>
      <div className="bg-slate-100 h-screen " >
        <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
          <h1>Enrolled Students</h1>
        </div>
        <div  >
          {students.length === 0 && <p>No students enrolled</p>}
          {students.map((student, index) => (
            <div key={index} className=" border  bg-slate-50 flex justify-between mx-10 rounded-xl ">
              
                <div className="flex  gap-4 p-3">
                  <div className="rounded-full  w-[6rem] h-[6rem]">
                    <img
                      className="  w-[6rem] h-[6rem] rounded-full border"
                      src={student.pfp_url}
                    />
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
                      {student.first_name} {student.last_name}
                    </h1>
                    <p>{student.id}</p>
                    <p className="my-2">{student.email}</p>
                  </div>
                </div>
                <div className="mx-2 p-2 ">
                  <button onClick={handleKickStudent} className="bg-red-500 text-white rounded-lg p-2">
                    <Trash size={24} />
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ViewStudents;
