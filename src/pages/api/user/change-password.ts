import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import changePasswordMethods from "@/server/handlers/users/change-password";

export default async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, changePasswordMethods, {
    authorize: true,
    allowUnverifiedEmail: false,
  });
}
