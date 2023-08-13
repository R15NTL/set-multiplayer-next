import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "@/server/utils/utils";
import * as yup from "yup";
import manageUsers from "@/server/auth/users/manageUsers";
import type { UserRecord } from "firebase-admin/auth";

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: UserRecord
) => {
  if (!user) {
    return res
      .status(500)
      .json({ error: "User authorization is not enabled for this request" });
  }

  const account = {
    user_id: user.uid,
    username: user.displayName,
    email: user.email,
    email_verified: user.emailVerified,
  };

  res.status(200).json(successResponse("Success", { account }));
};

const updateAccountSchema = yup.object().shape({
  username: yup.string().max(56).required(),
});

const PUT = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: UserRecord
) => {
  if (!user) {
    return res
      .status(500)
      .json(
        errorResponse("User authorization is not enabled for this request")
      );
  }

  try {
    await updateAccountSchema.validate(req.body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json(errorResponse(error.message));
    }
    return res
      .status(500)
      .json(errorResponse("Error while updating the user."));
  }

  const { username } = req.body;

  try {
    await manageUsers.updateUser(user.uid, {
      displayName: username,
    });

    res.status(200).json(successResponse("Account successfully updated", {}));
  } catch (error) {
    res.status(500).json(errorResponse("Error while updating the user."));
  }
};

const accountMethods = {
  GET,
  PUT,
};
export default accountMethods;
