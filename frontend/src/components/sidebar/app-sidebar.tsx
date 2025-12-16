// components/app-sidebar/index.tsx
"use server";

import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { User, Sparkles, Settings } from "lucide-react";
import Link from "next/link";
import SidebarMenuItems from "./side-bar-menu-items";
// import MobileSidebarClose from "./mobile-sidebar-close";
import Credits from "./credites";
// import Upgrade from "./upgrade";

export default async function AppSidebar() {
  return (
    <Sidebar className="border-r border-zinc-800/50 bg-black">
      <SidebarContent className="px-3">
        {/* <MobileSidebarClose /> */}
        <SidebarGroup>
          {/* Logo Section */}
          <SidebarGroupLabel className="mb-8 mt-6 flex flex-col items-start justify-start px-2">
            <Link
              href="/"
              className="group mb-1 flex cursor-pointer items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-lg shadow-white/10 transition-all group-hover:shadow-white/20">
                <Sparkles className="h-5 w-5 text-black" />
              </div>
              <p className="text-2xl font-bold tracking-tight text-white">
                AI Voice
              </p>
            </Link>
            <p className="ml-11 text-sm font-medium tracking-wide text-zinc-500">
              Studio
            </p>
          </SidebarGroupLabel>

          {/* Menu Items */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-zinc-800/50 bg-black p-3">
        {/* Credits & Upgrade */}
        <div className="mb-3 flex w-full items-center justify-center gap-2 text-xs">
          <Credits />
          {/* <Upgrade /> */}
        </div>

        {/* User Button */}
        <UserButton
          variant="outline"
          className="w-full border-zinc-800 bg-zinc-900/50 text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-900"
          disableDefaultLinks={true}
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/dashboard/customer-portal",
              icon: <User className="h-4 w-4" />,
            },
            {
              label: "Settings",
              href: "/dashboard/settings",
              icon: <Settings className="h-4 w-4" />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}