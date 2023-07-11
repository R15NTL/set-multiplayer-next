import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";

export const authorizeUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session) return false;

  return session;
};
