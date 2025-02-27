import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Pencil, KeyRound, Trash2 } from 'lucide-react'
import {useDispatch, useSelector} from 'react-redux'
import { setLoading, hideLoading } from "@/redux/features/loadingSlice";
import { setUserData } from "@/redux/features/userSlice";
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function ProfileActions() {
    const [editOpen, setEditOpen] = useState(false)
    const [passwordOpen, setPasswordOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const {toast} = useToast();
    const navigate = useNavigate();
    const {user_data} = useSelector((state) => state.user);
    const [user_name, setUserName] = useState(user_data?.user_name)
    const [email, setEmail] = useState(user_data?.email)
    const [first_name, setFirstName] = useState(user_data?.first_name)
    const [last_name, setLastName] = useState(user_data?.last_name)
    const [date_of_birth, setDateOfBirth] = useState(user_data?.date_of_birth)
    const dispatch = useDispatch()

    const handleUpdate = async () => {
        dispatch(setLoading());
        try{
        const res = await axios.put("http://localhost:3000/profile/update", {
            role:user_data?.role,
            id:user_data?.id,
            user_name,
            email,
            first_name,
            last_name,
            date_of_birth
        });
        dispatch(hideLoading());
        if(res.data.success){
            toast({
                title:"Success",
                description: "Profile updated successfully",
            });
            dispatch(setUserData(res.data.data));
            navigate("/profile");
        }

        }
        catch(err){
            dispatch(hideLoading());
            console.log(err);
            toast({
                title: "Error",
                description: err.response.data.message,
                variant:"destructive"
            })
        }
        }

    return (


        <>
            <div className="flex flex-col gap-4 border rounded-lg p-6 bg-white">
                <div className="flex items-center justify-between py-3 border-b">
                    <div>
                        <h3 className="font-semibold">Edit Profile</h3>
                        <p className="text-sm text-gray-500">Update your personal information</p>
                    </div>
                    <Button
                        onClick={() => setEditOpen(true)}
                        className="bg-primary hover:bg-[#3a30e2]"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                    <div>
                        <h3 className="font-semibold">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your password regularly</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setPasswordOpen(true)}
                    >
                        <KeyRound className="h-4 w-4 mr-2" />
                        Change Password
                    </Button>
                </div>

                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="font-semibold text-red-600">Delete Profile</h3>
                        <p className="text-sm text-gray-500">Permanently delete your account</p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Profile
                    </Button>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Update Your Information</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input value={user_name} onChange={(e) => setUserName(e.target.value)} id="username" defaultValue={user_data.user_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled id="email" type="email" defaultValue="mohammad@example.com" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input value={first_name} onChange={(e) => setFirstName(e.target.value)} id="firstName" defaultValue="Mohammad" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input value={last_name} onChange={(e) => setLastName(e.target.value)} id="lastName" defaultValue="Subhan" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} id="dob" type="date" defaultValue="2024-12-25" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} className="bg-primary hover:bg-[#3a30e2]">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Enter your current password and a new password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPasswordOpen(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            Update Password
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Profile Alert Dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ProfileActions;