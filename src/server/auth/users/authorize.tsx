import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export const authorizeUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
};
