import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
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
    title: "Inbox",
    url: "/",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/",
    icon: Search,
  },
 
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  }
];

export function AppSidebar() {
  return (

    <Sidebar variant='floating' collapsible='icon'>
      
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
  );
}
