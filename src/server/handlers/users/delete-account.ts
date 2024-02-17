import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "@/server/utils/utils";
import manageUsers from "@/server/auth/users/manageUsers";
import type { UserRecord } from "firebase-admin/auth";

const DELETE = async (
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
    await manageUsers.deleteUser(user.uid);
    res.status(200).json(successResponse("Account successfully deleted", {}));
  } catch (error) {
    res.status(500).json(errorResponse("Error while updating the user."));
  }
};

const deleteAccountMethods = {
  DELETE,
};
export default deleteAccountMethods;
