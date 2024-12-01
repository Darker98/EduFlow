import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const EditProfileForm = () => {
    return (
        <div className="flex flex-col p-5 h-fit border rounded-lg border-slate-200 w-full">
            <div className="flex items-center gap-2">
                <Separator className="bg-black w-1.5 rounded-lg h-9" orientation="vertical" />
                <h1 className="text-2xl">Edit Profile</h1>
            </div>
            <form className="pt-1">
                <div className="pt-2">
                    <Label htmlFor="name">Name</Label>
                    <Input className="w-1/3" type="text" />
                </div>
                <div className="pt-2">
                    <Label htmlFor="name">Username</Label>
                    <Input className="w-1/4" type="text" />
                </div>
                <div className="pt-2">
                    <Label htmlFor="name">Email</Label>
                    <Input className="w-1/3" type="email" />
                </div>
                <Button className="mt-4">Update</Button>
            </form>
        </div>
    );
}

export default EditProfileForm;