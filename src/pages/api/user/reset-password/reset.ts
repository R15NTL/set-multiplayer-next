import resetPasswordMethods from "@/server/handlers/users/resetPassword";
import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";

export default async function sendEmailVerificationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, resetPasswordMethods, {
    authorize: false,
  });
}
