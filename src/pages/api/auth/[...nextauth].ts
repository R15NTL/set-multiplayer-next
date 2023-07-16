import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getEnv } from "@/utils";
import { adminAuth } from "@/server/auth/firebase/firebaseInstance";
import manageUsers from "@/server/auth/users/manageUsers";

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
          return {
            id: uid,
            email,
            email_verified,
          };
        } catch (error) {
          return null;
        }
      },
    }),
    Credentials({
      id: "administrator",
      name: "Administator",
      credentials: {
        password: {},
      },
      async authorize(credentials) {
        const password = credentials?.password;
        if (!password) return null;
        if (password !== getEnv("ADMIN_PASSWORD")) return null;

        const userRecord = await manageUsers.getOrCreateAdminUser();
        return {
          id: userRecord.uid,
          name: "Admin",
          email: getEnv("ADMIN_EMAIL"),
          email_verified: true,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider === "credentials") {
        Object.assign(account, user);
        return true;
      }

      if (account?.provider === "google-sign-in") {
        const { uid, photoURL, emailVerified, displayName } =
          await manageUsers.getOrCreateGoogleUser(profile);

        const googleUser = {
          id: uid,
          name: displayName,
          email: email,
          email_verified: emailVerified,
          photo_url: photoURL,
        };

        Object.assign(account, googleUser);
        return true;
      }

      if (account?.provider === "administrator") {
        Object.assign(account, user);
        return true;
      }

      return false;
    },

    async jwt({ token, account, profile }: any) {
      if (account?.name) token.name = account.name;
      if (account?.id) token.user_id = account.id;
      if (account?.email_verified !== undefined)
        token.email_verified = account.email_verified;
      if (account?.email) token.email = account.email;
      if (account?.photo_url) token.photo_url = account.photo_url;

      return token;
    },

    async session({ session, token, user }: any) {
      if (token?.name) session.name = token.name;
      if (token?.user_id) session.user_id = token.user_id;
      if (token?.email_verified !== undefined)
        session.email_verified = token.email_verified;
      if (token?.email) session.email = token.email;
      if (token?.photo_url) session.photo_url = token.photo_url;

      return session;
    },
  },
};
export default NextAuth(authOptions);
