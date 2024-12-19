import React from "react";

const RoomCards = ({ courseName, instructorName }) => {
  return (
    <div>
      <div className="border shadow-lg border-grey w-[400px] h-[150px] rounded-lg bg-slate-50 hover:cursor-pointer hover:shadow-inner">
        <div className="bg-black rounded-t-lg text-white h-10 flex items-center">
            <h1 className="text-4xl  font-semibold mx-5">{courseName}</h1>
        </div>
        <div className="p-4 ">
          <p className="text-2xl ">{instructorName}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCards;
