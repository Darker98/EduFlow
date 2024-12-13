import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import ProfileSettings from "../components/ProfileSettings";
import React from "react";

const ProfilePage = () => {

    const user = {
        firstname: "Tom",
        lastname: "Cruise",
        username: "tomcruise_",
        email: "tomcruise1@gmail.com",
        role: "Instructor",
        dob: "July 3, 1962",
    }

    return (
        <div>
            <Layout pathname={"Profile"}>
                <div className="flex flex-col h-screen">
                    <ProfileCard user={user} />
                    <ProfileSettings />
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;