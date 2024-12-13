import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Info, Bell } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useToast } from "@/hooks/use-toast";
import { setUserId, setUserData } from "@/redux/features/userSlice";
const Navbar = ({ pathname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.user);
  const { toast } = useToast();
  const handleLogout = async() => {
  try{
    
    const res = await axios.get("http://localhost:3000/auth/logout");
    if(res.data.success){
      console.log(res.data)
      dispatch(setUserId(null));
      dispatch(setUserData(null));
      toast({
        title:"Success",
        description:res.data.message,
        variant:"success"
      });
      navigate("/login");
    }
  }
  catch(err){
    console.log(err);
    toast({
      title: "Error",
      description: err.response.data.message,
      variant:"destructive"
    })
  }
  }

  const location = useLocation();

  return (
    <div className="bg-slate-950 flex justify-between rounded h-14 items-center my-2  ">
      <div>
        <div className="flex  items-center  ">
          <SidebarTrigger className="text-white" />
          <h1 className="font-bold text-2xl text-white">
            {location.pathname
              .split("/")
              .filter((segment) => segment)
              .map(
                (segment) =>
                  segment.charAt(0).toUpperCase() +
                  segment.slice(1).toLowerCase()
              )
              .join(" ")}
          </h1>
        </div>
      </div>
      {/* this will be for not */}
      <div className=" mr-5">
        <div className="flex items-center gap-4">
          {user_id ? (
            <div onClick={handleLogout} className="hover:cursor-pointer hover:underline   text-white p-2 rounded-md">Logout</div>
          ) : (
            <>
              <NavLink to="/login" className=" text-white p-2 rounded-md">
                Login
              </NavLink>
              <NavLink to="/signup" className=" text-white p-2 rounded-md">
                Sign Up
              </NavLink>
            </>
          )}

          <NavLink to="/about">
            <Info className="text-white" />
          </NavLink>
          <button>
            <Bell className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
