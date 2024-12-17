import Layout from "../components/Layout";
import EditProfileForm from "../components/EditProfileForm";

const EditProfilePage = () => {
    return (
        <div>
            <Layout pathname={"Edit Profile"}>
                <div className="flex h-screen">
                    <EditProfileForm />
                </div>
            </Layout>
        </div>
    );
}

export default EditProfilePage;