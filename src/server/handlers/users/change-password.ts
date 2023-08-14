import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "@/server/utils/utils";
import * as yup from "yup";
import manageUsers from "@/server/auth/users/manageUsers";
import type { UserRecord } from "firebase-admin/auth";

const changePasswordSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirm_password: yup.string().required(),
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
    await changePasswordSchema.validate(req.body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json(errorResponse(error.message));
    }
    return res
      .status(500)
      .json(errorResponse("Error while updating the user."));
  }

  const { password, confirm_password } = req.body;

  if (password !== confirm_password)
    return res.status(400).json(errorResponse("Passwords do not match"));

  try {
    await manageUsers.updateUser(user.uid, {
      password: password,
    });

    res.status(200).json(successResponse("Password updated", {}));
  } catch (error) {
    res.status(500).json(errorResponse("Error while updating the user."));
  }
};

const changePasswordMethods = {
  PUT,
};
export default changePasswordMethods;
