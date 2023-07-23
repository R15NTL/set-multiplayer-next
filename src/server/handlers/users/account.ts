import { NextApiRequest, NextApiResponse } from "next";
import { getEnv } from "@/utils";
import jwt from "jsonwebtoken";
import { CustomSession } from "@/server/types/session";
import { successResponse } from "@/server/utils/utils";

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: CustomSession
) => {
  if (!user) {
    return res
      .status(500)
      .json({ error: "User authorization is not enabled for this request" });
  }

  const account = {
    user_id: user.user_id,
    username: user.name,
    email: user.email,
    email_verified: user.email_verified,
  };

  res.status(200).json(successResponse("Success", { account }));
};

const ioServerTokenMethods = {
  GET,
};
export default ioServerTokenMethods;
