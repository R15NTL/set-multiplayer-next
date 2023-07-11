import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      id: "google-sign-in",
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    }),
  ],
};
export default NextAuth(authOptions);
