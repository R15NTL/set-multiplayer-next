import jwt from "jsonwebtoken";
import * as yup from "yup";
// Services
import manageUsers from "@/server/auth/users/manageUsers";
// Utils
import { getEnv } from "@/utils";
import {
  errorResponse,
  successResponse,
  parseBody,
} from "@/server/utils/utils";
// Types
import { NextApiRequest, NextApiResponse } from "next";

const putSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().required().min(8),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = parseBody(req);

  try {
    await putSchema.validate(parsedBody);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
    return;
  }

  const { token } = parsedBody;

  // Verify the token.
  let decodedToken: any;
  try {
    const validate = jwt.verify(token, getEnv("JWT_SECRET_KEY"));
    decodedToken = validate;
  } catch (error) {
    res.status(400).json(errorResponse("Invalid token."));
    return;
  }

  const user = await manageUsers.isUserExistsId(decodedToken.userID);

  if (!user) {
    res.status(400).json(errorResponse("User no longer exists."));
    return;
  }

  // Update the user.
  try {
    await manageUsers.updateUser(user.uid, {
      emailVerified: true,
      password: parsedBody.password,
    });
  } catch (error) {
    res.status(500).json(errorResponse("Error while updating password."));
    return;
  }

  // Success.
  res.status(200).json(successResponse("Password updated.", {}));
};

const resetPasswordMethods = { PUT };
export default resetPasswordMethods;
