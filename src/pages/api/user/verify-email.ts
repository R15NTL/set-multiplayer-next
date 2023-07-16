import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import verifyEmailMethods from "@/server/handlers/users/verifyEmail";

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, verifyEmailMethods, {
    authorize: false,
  });
}
