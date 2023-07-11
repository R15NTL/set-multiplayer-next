import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getEnv } from "@/utils";

export const authOptions = {
  providers: [
    GoogleProvider({
      id: "google-sign-in",
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    }),
  ],
};
export default NextAuth(authOptions);
