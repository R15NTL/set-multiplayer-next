import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import createAccountMethods from "@/server/handlers/users/create-account";

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, createAccountMethods, { authorize: false });
}
