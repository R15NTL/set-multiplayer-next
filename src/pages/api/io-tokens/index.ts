import { NextApiRequest, NextApiResponse } from "next";
import { requestHandler } from "@/server/auth/services/handleRequest";
import ioServerTokenMethods from "@/server/handlers/ioTokens/ioServerToken";

export default async function ioServerToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await requestHandler(req, res, ioServerTokenMethods, {
    authorize: true,
  });
}
