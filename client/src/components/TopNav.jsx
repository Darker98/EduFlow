import { Info } from 'lucide-react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useNavigate } from 'react-router-dom'

function TopNav() {

    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 md:px-6">
                <div className="flex items-center gap-4 lg:gap-6">
                    <SidebarTrigger className="" />
                    <Link to="/home" className="flex items-center gap-2">
                        <img
                            src="/placeholder.svg?height=32&width=32"
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
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default TopNav;