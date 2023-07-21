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
  const ioServerSecret = getEnv("IO_SERVER_SECRET");

  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.name,
    },
    ioServerSecret,
    {
      expiresIn: 60, // 1 minute
    }
  );

  res
    .status(200)
    .json(successResponse("Token created successfully.", { token }));
};

const ioServerTokenMethods = {
  GET,
};
export default ioServerTokenMethods;
