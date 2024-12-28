import { Info } from 'lucide-react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setUserData } from '@/redux/features/userSlice'
import { setRoomData } from '@/redux/features/roomSlice'
import { setAssignmentData } from '@/redux/features/assignmentSlice'
import {setLoading, hideLoading} from '@/redux/features/loadingSlice'
import { setSessionId } from '@/redux/features/sessionSlice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function TopNav() {
    const {toast} = useToast()
    const navigate = useNavigate()
    const {user_data} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try{
            dispatch(setLoading())
            const res = await axios.get("http://localhost:3000/auth/logout")
            dispatch(hideLoading())
            if(res.data.success){
                toast({
                    title:"Logged Out",
                    description: "You have been successfully logged out", 
                    variant:"success"
                })
                dispatch(setUserData(null)) 
                dispatch(setRoomData(null))
                dispatch(setSessionId(null))
                dispatch(setAssignmentData(null))
                navigate("/login")

            }
        }
        catch(err){
            dispatch(hideLoading()) 
            console.log(err);
            toast({
                title:"Logout Failed",
                description: "An error occurred while logging out", 
                variant:"destructive"
            })
        }
    }

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 md:px-6">
                <div className="flex items-center gap-4 lg:gap-6">
                    <SidebarTrigger className="" />
                    <Link to="/home" className="flex items-center gap-2">
                        <img
                            src="eduflow.png" //need to add a png here
                            alt="EduFlow Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                        <span className="hidden text-xl font-bold text-primary md:inline-block">
                            EduFlow
                        </span>
                    </Link>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <Button
                        onClick={() => navigate("/about")}
                        variant="ghost"
                        size="icon"
                        className="text-gray-700 hover:bg-purple-50 hover:text-primary"
                    >
                        <Info className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8 border border-black">
                                    <AvatarImage  src={user_data.pfp_url} alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick = {() => handleLogout()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default TopNav;