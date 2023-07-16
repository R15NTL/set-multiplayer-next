import { authorizeUser } from "../users/authorize";
import { NextApiRequest, NextApiResponse } from "next";
import { errorResponse } from "@/server/utils/utils";
import { CustomSession } from "@/server/types/session";

interface RequestHandlerSettings {
  authorize: boolean;
  allowUnverifiedEmail?: boolean;
}

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: CustomSession
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
  { authorize, allowUnverifiedEmail = false }: RequestHandlerSettings
) => {
  try {
    const methods = Object.keys(handlers);
    if (!req?.method || !methods.includes(req.method)) {
      res.status(405).json(errorResponse(`Method ${req.method} Not Allowed`));
      return;
    }

    const handler = handlers[req.method as keyof typeof handlers];
    if (!handler) {
      res.status(405).json(errorResponse(`Method ${req.method} Not Allowed`));
      return;
    }

    // Authorization check.
    const user = authorize && (await authorizeUser(req));
    if (authorize && !user) {
      res.status(401).json(errorResponse("Unauthorized"));
      return;
    }

    // If user has not verified their email.
    const userHasVerifiedEmail = user && user.email_verified;
    if (authorize && !allowUnverifiedEmail && !userHasVerifiedEmail) {
      res.status(403).json(errorResponse("Email not verified"));
      return;
    }

    await handler(req, res, user || undefined);
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("An error occurred while processing your request"));
  }
};
