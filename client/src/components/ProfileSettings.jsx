import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import { useToast } from "@/hooks/use-toast";
import { setRoomData } from "@/redux/features/roomSlice";
import { setRoomId } from "@/redux/features/roomSlice";
import { setSessionId } from "@/redux/features/sessionSlice";
import { setUserId, setUserData } from "@/redux/features/userSlice";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_data } = useSelector((state) => state.user);
  const { toast } = useToast();
  const handleUserDelete = async () => {
    try {
        dispatch(setLoading());
      const res = await axios.post("http://localhost:3000/profile/delete", {
        id: user_data.id,
        role: user_data.role,
      });
        dispatch(hideLoading());
        toast({
          title: "Profile Deleted",
          description: "Profile has been deleted successfully",
          variant: "default",
        });
        dispatch(setUserId(null));
        dispatch(setRoomId(null));
        dispatch(setUserData(null));
        dispatch(setRoomData(null));
        dispatch(setSessionId(null));
        navigate("/login");
      
    } catch (err) {
    dispatch(hideLoading());
      console.log(err);
      toast({
        title: "Error",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };
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
      <div className="flex items-center justify-between p-3 w-full border bg-gray-50 border-gray-200 rounded-lg h-16">
        <p className="text-base">Delete Profile</p>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUserDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfileSettings;
