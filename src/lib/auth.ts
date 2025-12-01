import { passkey } from "@better-auth/passkey";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    passkey({
      rpID: process.env.PASSKEY_RP_ID!,
      rpName: process.env.PASSKEY_RP_NAME!,
      origin: process.env.NODE_ENV === "production" ? process.env.BETTER_AUTH_URL! : "http://localhost:3000",
    }),
  ],
});
