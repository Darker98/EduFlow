import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import React from "react";

const ProfilePage = () => {
    return (
        <div>
            <Layout>
                <div className="flex h-screen">
                    <ProfileCard fullname="Tom Cruise" username="tomcruise_" email="tomcruise1@gmail.com" role="Insructor"/>
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;