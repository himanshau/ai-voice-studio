"use client"

import { authClient } from "~/lib/auth-client"
import { Button } from "../ui/button"
import { Sparkles, Crown } from "lucide-react"


export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: ["a7d2a87b-8333-4038-a74c-bb5fdaa60f65", "7f74692a-f97a-4c38-bdc4-56f78873d564", "1e66aa8f-1fac-4c2d-8083-4d08373088c0"]
        })
    }
    return <Button
        variant="outline"
        size="sm"
        className="group relative ml-2 overflow-hidden border-zinc-700 bg-zinc-800/50 text-zinc-300 transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/20"
        onClick={upgrade}
    >
        <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-medium">Upgrade</span>
            <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-md bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
}