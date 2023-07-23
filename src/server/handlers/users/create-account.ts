import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import manageUsers from "@/server/auth/users/manageUsers";
import {
  errorResponse,
  successResponse,
  parseBody,
} from "@/server/utils/utils";

const postSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = parseBody(req);

  try {
    await postSchema.validate(parsedBody);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
    return;
  }
  const { email, password, name } = parsedBody;

  if (await manageUsers.isUserExistsEmail(email)) {
    res.status(400).json(errorResponse("User already exists"));
    return;
  }

  const user = await manageUsers.createUser({
    displayName: name,
    email,
    password,
  });

  if (!user) {
    res.status(400).json(errorResponse("User already exists"));
    return;
  }

  res.status(200).json(successResponse("User created", {}));
};

const createAccountMethods = { POST };
export default createAccountMethods;
