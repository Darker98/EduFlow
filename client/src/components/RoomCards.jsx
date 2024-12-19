import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCards = ({ roomName, sectionName, room_id }) => {
  const navigate = useNavigate()
  return (
    <div className="transition-transform transform hover:scale-105 duration-200 ease-in-out">
      <div className="border shadow-lg border-gray-300 w-[400px] h-[180px] rounded-lg bg-white hover:cursor-pointer hover:shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg text-white h-14 flex items-center justify-between px-5">
          <h1 className="text-2xl font-bold truncate">{roomName}</h1>
          <button onClick= {()=> navigate(`/room/${room_id}`)} className="bg-white text-blue-600 px-3 py-1 rounded-lg font-medium text-sm hover:bg-gray-100">
            Enter
          </button>
        </div>

        {/* Details Section */}
        <div className="p-4">
          <p className="text-lg text-gray-600">
            Section Name: <span className="font-semibold">{sectionName}</span>
          </p>
          <p className="text-lg text-gray-600">
            Status: <span className="font-semibold text-green-600">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCards;
