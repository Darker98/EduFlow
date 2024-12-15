import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import ProfileSettings from "../components/ProfileSettings";
import React from "react";

const ProfilePage = () => {

    return (
        <div>
            <Layout pathname={"Profile"}>
                <div className="flex flex-col h-screen">
                    <ProfileCard  />
                    <ProfileSettings />
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;