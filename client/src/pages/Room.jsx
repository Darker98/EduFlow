import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import {ClipboardList} from 'lucide-react'
import { Description } from "@radix-ui/react-dialog";

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
                  <NavLink to="">Room</NavLink>
                </ul>
              </div>
            </div>
            {/* upper bar */}
            {/* content */}
            <div className="mx-40 p-10">
              {/* banner */}
              <div className="border h-[250px] flex items-end p-6 rounded-lg " style={{background: 'url(/banner.jpg)'}}>
              <div className="text-4xl text-white font-bold flex gap-4 flex-col">
              <p>ClassName</p>
              <p>Section</p>
              </div>
              </div>
              {/* banner */}

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
