import React from "react";
import Layout from "../components/Layout";
import HomeCards from "@/components/HomeCards";
import Navbar from "@/components/Navbar";
import {User} from 'lucide-react'
const HomePage = () => {
  return (
    <div className="bg-slate-300">
      <Layout>
      
      <div className=" border flex justify-center  flex-wrap gap-10">
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'9rem'} width={'9rem'}/>}/>
        
  
        </div>  
      
      </Layout>
    </div>
  );
};

export default HomePage;
