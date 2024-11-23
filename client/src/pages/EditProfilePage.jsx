import Layout from "../components/Layout";
import EditProfileForm from "../components/EditProfileForm";

const EditProfilePage = () => {
    return (
        <div>
            <Layout>
                <div className="flex h-screen">
                    <EditProfileForm />
                </div>
            </Layout>
        </div>
    );
}

export default EditProfilePage;