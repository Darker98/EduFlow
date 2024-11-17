import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      
      <AppSidebar />
        
          
      <main className="p-2 flex-grow">
        <Navbar/>
        {children}
        </main>
      
    </SidebarProvider>
  );
};

export default Layout;
