import SidebarUI from "@/components/shared/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "@tanstack/react-router"

const Dashboard = () => {
    return (
        <div>
            <SidebarProvider>
                <SidebarUI />
                <Outlet />
            </SidebarProvider>
        </div>
    )
}

export default Dashboard