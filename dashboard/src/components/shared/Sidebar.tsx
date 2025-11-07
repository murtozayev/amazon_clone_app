import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AnimateIcon } from "../animate-ui/icons/icon"
import { Users } from "../animate-ui/icons/users"
import { ClipboardList } from "../animate-ui/icons/clipboard-list"
import { Kanban } from "../animate-ui/icons/kanban"
import { MessageCircleMore } from "../animate-ui/icons/message-circle-more"
import { User } from "../animate-ui/icons/user"
import { Link } from "@tanstack/react-router"
import icon from "@/assets/images/amazon.png"

const items = [
    { title: "Xodimlar", url: "/employee", icon: <Users className="w-5 h-5" /> },
    { title: "Vazifalar", url: "/tasks", icon: <ClipboardList className="w-5 h-5" /> },
    { title: "Mahsulotlar", url: "/products", icon: <Kanban className="w-5 h-5" /> },
    { title: "Qo'llab quvvatlash", url: "#", icon: <MessageCircleMore className="w-5 h-5" /> },
    { title: "Profil", url: "/profile", icon: <User className="w-5 h-5" /> },
]

export default function SidebarUI() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <img src={icon} alt="Icon" className="w-10 h-10 mx-auto" />
                        <span>Amazon dashboard</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className="group relative flex items-center h-10 rounded-lg transition-colors hover:bg-gray-100 cursor-target dark:hover:bg-gray-800"
                                    >
                                        <Link
                                            to={item.url}
                                            activeOptions={{ exact: true }}
                                            activeProps={{
                                                className:
                                                    "bg-blue-100",
                                            }}
                                            className="flex gap-3 items-center w-full text-[14px] text-slate-400 transition-colors text-decoration-none"
                                        >
                                            <AnimateIcon
                                                animateOnHover
                                                className="group-hover:text-blue-400 text-inherit transition-colors"
                                            >
                                                {item.icon}
                                            </AnimateIcon>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
