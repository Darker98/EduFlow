import React from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './ui/app-sidebar'
import { Separator } from "@/components/ui/separator"

const Layout = ({children}) => {
  return (
    <div>
       <SidebarProvider>
       <AppSidebar />
       {children}
       </SidebarProvider>
    </div>
  )
}

export default Layout
