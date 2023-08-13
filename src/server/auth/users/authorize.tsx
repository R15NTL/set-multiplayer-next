import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomSession } from "@/server/types/session";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const authorizeUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // NextAuth bug: Fails to get session if request has a body
  // therefore we skip the session check if there is a body
  const session = req.body
    ? ((await getSession({ req })) as CustomSession | null)
    : null;

  if (!session) {
    const serverSession = await getServerSession(req, res, authOptions);

    if (!serverSession) return false;

    return serverSession;
  }

  return session;
};

interface AuthorizeUserSignInProps {
  email: string;
  password: string;
}
