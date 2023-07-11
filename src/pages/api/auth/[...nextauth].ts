import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getEnv } from "@/utils";
import { adminAuth } from "@/server/auth/firebase/firebaseInstance";

export const authOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    GoogleProvider({
      id: "google-sign-in",
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        token: {},
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (!token) return null;
        try {
          const decodedToken = await adminAuth.verifyIdToken(token);
          const { uid, email, email_verified } = decodedToken;
          console.log(decodedToken);
          return {
            id: uid,
            email,
            email_verified,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
