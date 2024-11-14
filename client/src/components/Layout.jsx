import React from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './ui/app-sidebar'

const Layout = ({children}) => {
  return (
    <div>
       <SidebarProvider>
       <AppSidebar />
       <SidebarTrigger/>
       {children}
       </SidebarProvider>
    </div>
  )
}

export default Layout
