import { polarClient } from "@polar-sh/better-auth/client";
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // Uses same domain by default, no baseURL needed for same-origin requests
    plugins: [polarClient()]
});