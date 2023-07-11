import { authorizeUser } from "../users/authorize";
import { NextApiRequest, NextApiResponse } from "next";
import { errorResponse } from "@/server/utils/utils";
import { Session } from "next-auth";

interface RequestHandlerSettings {
  authorize: boolean;
}

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: Session | false
) => void | Promise<void>;

export const requestHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handlers: {
    GET?: Handler;
    POST?: Handler;
    PUT?: Handler;
    DELETE?: Handler;
  },
  { authorize }: RequestHandlerSettings
) => {
  try {
    const methods = Object.keys(handlers);
    if (req.method && !methods.includes(req.method)) {
      res.status(405).json(errorResponse(`Method ${req.method} Not Allowed`));
      return;
    }

    const handler = handlers[req.method as keyof typeof handlers];
    if (!handler) {
      res.status(405).json(errorResponse(`Method ${req.method} Not Allowed`));
      return;
    }

    const user = authorize && (await authorizeUser(req));
    if (authorize && !user) {
      res.status(401).json(errorResponse("Unauthorized"));
      return;
    }

    await handler(req, res, user);
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("An error occurred while processing your request"));
  }
};
