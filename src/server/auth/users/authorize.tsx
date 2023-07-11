import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
import { adminAuth } from "../firebase/firebaseInstance";

export const authorizeUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session) return false;

  return session;
};

interface AuthorizeUserSignInProps {
  email: string;
  password: string;
}
