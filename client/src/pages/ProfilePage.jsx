import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import React from "react";

const ProfilePage = () => {
    return (
        <div>
            <Layout>
                <div className="flex h-screen">
                    <ProfileCard/>
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;