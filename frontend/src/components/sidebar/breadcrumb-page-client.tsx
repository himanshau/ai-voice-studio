"use client"

import { usePathname } from "next/navigation"
import { BreadcrumbPage } from "../ui/breadcrumb"



export default function BreadcrumbPageClient({ children }: { children: React.ReactNode }) {
    const path = usePathname()
    
    const getPageTitle = (path: string) =>{
        switch (path){
            case "/dashboard":
                return "Dashboard"
            case "/dashboard/Create":
                return "Create"
            case "/dashboard/Projects":
                return "Projects"
            case "/dashboard/Settings":
                return "Settings"
            default:
                return "Dashboard"
        }
    }

    return (
        <div>
            <BreadcrumbPage className="text-sm font-semibold text-">
                {getPageTitle(path)}
            </BreadcrumbPage>
        </div>
    )
}