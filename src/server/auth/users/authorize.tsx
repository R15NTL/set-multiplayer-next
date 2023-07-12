import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
import { CustomSession } from "@/server/types/session";

export const authorizeUser = async (req: NextApiRequest) => {
  const session = (await getSession({ req })) as CustomSession | null;
  if (!session) return false;

  return session;
};

interface AuthorizeUserSignInProps {
  email: string;
  password: string;
}
