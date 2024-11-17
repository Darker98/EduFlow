import React from "react";
import Layout from "../components/Layout";
import HomeCards from "@/components/HomeCards";
import Navbar from "@/components/Navbar";
import {User} from 'lucide-react'
const HomePage = () => {
  return (
    <div  >
      <Layout>
      
      <div className="  flex border justify-around flex-wrap gap-10">
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
        <HomeCards title={"Profile"} content={<User height={'4rem'} width={'4rem'}/>}/>
  
        </div>  
      
      </Layout>
    </div>
  );
};

export default HomePage;
