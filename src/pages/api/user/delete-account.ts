import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import deleteAccountMethods from "@/server/handlers/users/delete-account";

export default async function deleteAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, deleteAccountMethods, {
    authorize: true,
    allowUnverifiedEmail: false,
  });
}
