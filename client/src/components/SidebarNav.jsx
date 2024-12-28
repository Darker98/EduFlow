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

const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Profile", href: "/profile", icon: User2 },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Results", href: "/results", icon: BarChart3 },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Rooms", href: "/rooms", icon: BookOpen },
    { name: "Students", href: "/students", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
]

function SidebarNav() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
            <SidebarTrigger />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
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
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default SidebarNav;