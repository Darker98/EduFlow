import React from "react";

const RoomCards = ({ courseName, instructorName }) => {
  return (
    <div>
      <div className="border border-grey w-[350px] h-[150px] rounded-lg bg-slate-50">
        <div className="bg-black text-white h-16 flex items-center">
            <h1 className="text-4xl font-semibold mx-5">{courseName}</h1>
        </div>
        <div className="p-4 ">
          <p className="text-2xl ">{instructorName}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCards;
