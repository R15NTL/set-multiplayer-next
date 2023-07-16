import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import sendPasswordResetLinkMethods from "@/server/handlers/users/sendPasswordResetLink";

export default async function sendEmailVerificationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, sendPasswordResetLinkMethods, {
    authorize: false,
  });
}
