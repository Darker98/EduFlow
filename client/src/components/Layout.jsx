import SidebarNav from "./SidebarNav"
import TopNav from "./TopNav"
import { SidebarProvider } from "@/components/ui/sidebar"

function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <TopNav />
                <div className="flex">
                    <SidebarNav />
                    <main className="flex-1 px-4 pb-8">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Layout;