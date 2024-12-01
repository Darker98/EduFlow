import { Calendar, Home, List, Scroll, Search, Settings, Library , User, ListCheck, Grid2x2Check, Grid} from "lucide-react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Calendar",
    url: "/",
    icon: Calendar,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Scroll,
  },
 
  {
    title: "Courses",
    url: "/",
    icon: Library,
  },
  {
    title: "Result",
    url: '/result',
    icon: ListCheck
  },
  {
    title: "Room",
    url: '/room',
    icon: Grid2x2Check 
  }
];

export function AppSidebar() {
  return (

    <div>
    <Sidebar variant='floating' collapsible='icon' >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-black mb-10">
            EduFlow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
       
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500">
            © 2024 EduFlow. All rights reserved.
          </p>
        </div>
      </SidebarFooter>
    
    </Sidebar>
    </div>
  );
}
