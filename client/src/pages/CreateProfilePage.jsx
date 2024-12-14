import Layout from "../components/Layout";
import CreateProfileForm from "../components/CreateProfileForm";

const EditProfilePage = () => {
    return (
        <div>
            <Layout pathname={"Create Profile"}>
                <div className="flex h-screen">
                    <CreateProfileForm />
                </div>
            </Layout>
        </div>
    );
}

export default EditProfilePage;