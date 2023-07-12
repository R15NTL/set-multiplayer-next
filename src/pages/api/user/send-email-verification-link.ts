import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import sendEmailVerificationLinkMethods from "@/server/handlers/users/sendEmailVerificationLink";

export default async function sendEmailVerificationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, sendEmailVerificationLinkMethods, {
    authorize: true,
    allowUnverifiedEmail: true,
  });
}
