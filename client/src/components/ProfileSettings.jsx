import { Button } from "@/components/ui/button";

const ProfileSettings = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-3 w-full border bg-gray-50 border-gray-200 rounded-lg h-16">
                <p className="text-base">Update Profile</p>
                <Button asChild>
                    <a href="/edit-profile">Edit Profile</a>
                </Button>
            </div>
            <div className="flex items-center justify-between p-3 w-full border bg-gray-50 border-gray-200 rounded-lg h-16">
                <p className="text-base">Change Password</p>
                <Button asChild>
                    <a href="/profile">Change</a>
                </Button>
            </div>
        </div>
    );
};

export default ProfileSettings;