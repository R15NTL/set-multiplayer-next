import { NextApiRequest, NextApiResponse } from "next";
import { successResponse } from "@/server/utils/utils";
import type { UserRecord } from "firebase-admin/auth";

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: UserRecord
) => {
  if (!user) {
    return res
      .status(500)
      .json({ error: "User authorization is not enabled for this request" });
  }

  const account = {
    user_id: user.uid,
    username: user.displayName,
    email: user.email,
    email_verified: user.emailVerified,
  };

  res.status(200).json(successResponse("Success", { account }));
};

const accountMethods = {
  GET,
};
export default accountMethods;
