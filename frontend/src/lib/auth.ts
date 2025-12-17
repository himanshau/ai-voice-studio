import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";
import { env } from "~/env";
import { Polar } from "@polar-sh/sdk";
import { checkout, polar, portal, usage, webhooks } from "@polar-sh/better-auth";
import { db } from "~/server/db";
const polarclient = new Polar({
    accessToken: env.POLAR_API_KEY,
    server: "sandbox"
})
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
        }),
        emailAndPassword: {
            enabled: true,
        },
        plugins: [
            polar({
                client: polarclient,
                createCustomerOnSignUp: true,
                use: [
                    checkout({  
                        products: [
                            {
                                productId: "1e66aa8f-1fac-4c2d-8083-4d08373088c0", // ID of Product from Polar Dashboard
                                slug: "small" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                            },
                            {
                                productId: "7f74692a-f97a-4c38-bdc4-56f78873d564", // ID of Product from Polar Dashboard
                                slug: "medium" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                            },
                            {
                                productId: "a7d2a87b-8333-4038-a74c-bb5fdaa60f65", // ID of Product from Polar Dashboard
                                slug: "large" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                            }
                        ],
                        successUrl: "/dashboard",
                        authenticatedUsersOnly: true
                    }),
                    portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "1e66aa8f-1fac-4c2d-8083-4d08373088c0":
                creditsToAdd = 50;
                break;
              case "7f74692a-f97a-4c38-bdc4-56f78873d564":
                creditsToAdd = 200;
                break;
              case "a7d2a87b-8333-4038-a74c-bb5fdaa60f65":
                creditsToAdd = 400;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});