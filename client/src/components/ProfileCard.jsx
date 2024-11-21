import React from "react";
import { CircleUser } from 'lucide-react'

const DetailCard = ({ title, value }) => {
    return (
        <div className="w-40 h-16 border rounded-lg p-2 pl-4 flex flex-col justify-center border-neutral-200 border-r my-4 hover:cursor-pointer hover:shadow-lg transition duration-200">
            <p className="text-lg">{value}</p>
            <p className="text-xs">{title}</p>
        </div>
    );
}

const ProfileCard = ({ fullname, username, role, email }) => {
    return (
        <div className="w-full relative flex flex-col items-center">
            <div className="w-full relative h-2/5 rounded-lg border border-neutral-200 m-2 flex">
                <div className="user-div p-5 flex justify-center items-center w-1/3">
                    <CircleUser height={'13rem'} width={'13rem'} />
                </div>
                <div className="detail-div w-full">
                    <div className="flex flex-col p-5 pt-14 h-full">
                        <h1 className="text-3xl font-bold">{fullname}</h1>
                        <div className="flex gap-14 pt-6">
                            <div>
                                <p className="text-sm">Username</p>
                                <p className="text-lg">@{username}</p>
                            </div>
                            <div>
                                <p className="text-sm">Role</p>
                                <p className="text-lg">{role}</p>
                            </div>
                            <div>
                                <p className="text-sm">Email Address</p>
                                <p className="text-lg">{email}</p>
                            </div>
                        </div>
                        <div className="pt-4 flex gap-10">
                            <DetailCard title="Courses Enrolled" value="5" />
                            <DetailCard title="Courses Enrolled" value="5" />
                            <DetailCard title="Courses Enrolled" value="5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;