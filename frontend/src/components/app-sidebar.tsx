"use client"

import * as React from "react"
import {
    Mic2,
    LayoutDashboard,
    Settings,
    History,
    FileAudio,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "~/components/ui/sidebar"

// Navigation items for the sidebar
const navItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Text to Speech",
        url: "/dashboard/tts",
        icon: Mic2,
    },
    {
        title: "Audio Files",
        url: "/dashboard/audio",
        icon: FileAudio,
    },
    {
        title: "History",
        url: "/dashboard/history",
        icon: History,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* Header with Logo */}
            <SidebarHeader className="border-b border-gray-800 px-4 py-4">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Mic2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-100 group-data-[collapsible=icon]:hidden">
                        AI Voice Studio
                    </span>
                </Link>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent className="px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-gray-800 px-4 py-4">
                <div className="text-xs text-gray-500 group-data-[collapsible=icon]:hidden">
                    © 2024 AI Voice Studio
                </div>
            </SidebarFooter>

            {/* Rail for collapsed state toggle */}
            <SidebarRail />
        </Sidebar>
    )
}
