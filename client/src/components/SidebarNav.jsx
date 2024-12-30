import { Home, GraduationCap, User2, BarChart3, Calendar, BookOpen, Users, Settings } from 'lucide-react'
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { useSelector } from 'react-redux';

const navigationInstructor = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Profile", href: "/profile", icon: User2 },
    { name: "Rooms", href: "/rooms", icon: BookOpen },
]
const navigationStudent = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Profile", href: "/profile", icon: User2 },
    { name: "Rooms", href: "/rooms", icon: GraduationCap }
]

function SidebarNav() {
    const { user_data } = useSelector(state => state.user)
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Sidebar  className="border-r bg-white/80 backdrop-blur-sm">
            <SidebarTrigger />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            { user_data.role === 'student' ?  ( navigationStudent.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={isActive ? "bg-purple-50 text-purple-600" : ""}
                                        >
                                            <Link to={item.href}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })) : (
                                navigationInstructor.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={isActive ? "bg-purple-50 text-purple-600" : ""}
                                            >
                                                <Link to={item.href}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default SidebarNav;