import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import ProfileSettings from "../components/ProfileSettings";
import React from "react";

const ProfilePage = () => {
    return (
        <div>
            <Layout>
                <div className="flex flex-col h-screen">
                    <ProfileCard fullname="Tom Cruise" username="tomcruise_" email="tomcruise1@gmail.com" role="Insructor"/>
                    <ProfileSettings />
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;