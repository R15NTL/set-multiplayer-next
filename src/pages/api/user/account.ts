import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import accountMethods from "@/server/handlers/users/account";

export default async function ioServerToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, accountMethods, {
    authorize: true,
    allowUnverifiedEmail: true,
  });
}
