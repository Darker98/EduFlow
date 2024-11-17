import React from "react";
import {User} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
const HomeCards = ({content, title}) => {
  return (
    <div>
      <Card className='h-[200px] w-[200px] my-4 hover:cursor-pointer hover:shadow-2xl transition duration-200'>
        <CardHeader>
          <CardTitle className='text-4xl text-center'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
            <div>
                {content}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeCards;
