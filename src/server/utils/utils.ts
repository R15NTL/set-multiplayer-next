import { NextApiRequest } from "next";

interface IApiResponse {
  data: object;
  message: string;
  success: boolean;
}

export const internalApiResponse = ({
  success,
  message,
  data,
}: IApiResponse) => {
  const response = {
    success,
    message,
    data,
  };
  return { data: response };
};

export const errorResponse = (message: string) =>
  internalApiResponse({
    success: false,
    message,
    data: {},
  });

export const successResponse = (message: string, data: object) =>
  internalApiResponse({
    success: true,
    message,
    data,
  });

export const parseBody = (req: NextApiRequest) =>
  typeof req.body === "string" ? JSON.parse(req.body) : req.body;
