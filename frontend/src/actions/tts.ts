"use server"

import { headers } from "next/headers";
import { cache } from "react"
import { auth } from "~/lib/auth"
import { db } from "~/server/db"

export const getusercredits = cache(async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user) {
            return {success: false, message: "User not found", credits:0};
        }
        const user = await db.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                credits: true,
            },
        })
        if (!user) {
            return {success: false, message: "User not found", credits:0};
        }
        return {success: true, message: "User found", credits:user.credits};

    }
    catch (error) {
        console.error("Error fetching user credits:", error);
        return {success: false, message: "Error fetching user credits", credits:0};
    }
});
