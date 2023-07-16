import jwt from "jsonwebtoken";
import * as yup from "yup";
// Services
import { transporter } from "@/server/auth/services/nodeMailer";
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

const postSchema = yup.object().shape({
  email: yup.string().required().email(),
});

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = parseBody(req);

  try {
    await postSchema.validate(parsedBody);
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
    return;
  }

  const { email } = parsedBody;

  const user = await manageUsers.isUserExistsEmail(email);

  if (!user) {
    res.status(400).json(errorResponse("User does not exist."));
    return;
  }

  // Create a verification token.
  const verificationToken = jwt.sign(
    { userID: user.uid },
    getEnv("JWT_SECRET_KEY"),
    { expiresIn: "24h" }
  );

  // Email options.
  const mailOptions = {
    from: getEnv("NODEMAILER_EMAIL_PROVIDER_SENDER"),
    to: user.email,
    subject: "Reset Password",
    text: `Reset your password by clicking the following link: \n${getEnv(
      "BASE_URL_FRONTEND"
    )}\/verify\/${verificationToken}\n\n
    Verification token: ${verificationToken}`,
  };

  // Send the email.
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res
        .status(500)
        .json(errorResponse("Error while sending password reset link."));
    } else {
      res.status(200).json(successResponse("Password reset link sent.", {}));
    }
  });
};

const sendPasswordResetLinkMethods = { POST };
export default sendPasswordResetLinkMethods;
