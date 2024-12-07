import React from "react";
import { ArrowDown, ClipboardList } from "lucide-react";
import { AArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const classwork = [
  {
    icon: ClipboardList,
    name: "Assignment 1",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/12/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 2",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/11/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 3",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "2/12/2021",
    created_at: "12/12/2011",
  },
  {
    icon: ClipboardList,
    name: "Assignment 4",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/1/2021",
  },
  {
    icon: ClipboardList,
    name: "Assignment 5",
    Description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    due_date: "12/12/2021",
    created_at: "12/12/2021",
  },
];

const Classwork = () => {
  return (
    <Layout pathname={"Classwork"}>
      <div className="flex flex-col gap-4 mx-40 p-14">
        <div className=" flex flex-col  gap-4  p-1 my-10">
          {classwork.map((item, index) => (
            <Collapsible
              key={index}
              className="hover:shadow-2xl transition duration-300 gap-5 border border-grey p-5 rounded-xl"
            >
              <div className=" flex justify-between ">
                <div className=" flex gap-4 items-center">
                  <div className="rounded-full border border-black p-2">
                    <item.icon />
                  </div>
                  <h1 className="text-xl font-bold">{item.name}</h1>
                </div>
                <CollapsibleTrigger>
                  <Button className="bg-white text-black hover:bg-slate-50 border">
                    <ArrowDown />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div>
                  <div className="p-5 flex gap-4">
                    <p>
                      <span className="font-semibold">Task Description: </span>
                      {item.Description}
                    </p>
                    <p>
                      <span className="font-semibold">Due Date: </span>
                      {item.due_date}
                    </p>
                  </div>
                  <span className="font-semibold p-5">Posted At: {item.created_at}</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Classwork;
