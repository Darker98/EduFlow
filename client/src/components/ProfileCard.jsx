import React from "react";
import { CircleUser } from 'lucide-react'

const ProfileCard = ({ fullname, username, phone, email }) => {
    return (
        <div className="w-full relative flex flex-col items-center">
            <div className="w-full relative h-2/5 rounded-lg border border-neutral-200 m-2 flex">
                <div className="user-div p-5 flex justify-center items-center w-1/3">
                    <CircleUser height={'13rem'} width={'13rem'} />
                </div>
                <div className="detail-div w-full">
                    <div className="flex flex-col p-5 pt-14 h-full">
                        <h1 className="text-3xl font-bold">Test User</h1>
                        <h2 className="text-md font-semibold">@test-user</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;