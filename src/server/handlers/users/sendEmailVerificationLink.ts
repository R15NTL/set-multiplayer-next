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
  if (user.emailVerified) {
    res.status(400).json(errorResponse("Email is already verified."));
    return;
  }

  // Create a verification token.
  const verificationToken = jwt.sign(
    { userID: user.uid, purpose: "email-verification" },
    getEnv("JWT_SECRET_KEY"),
    {
      expiresIn: 1000 * 60 * 20, // 20 minutes
    }
  );

  // Email options.
  const mailOptions = {
    from: getEnv("NODEMAILER_EMAIL_PROVIDER_SENDER"),
    to: user.email,
    subject: "Account Verification",
    text: `Please verify your account by clicking the following link: \n${getEnv(
      "BASE_URL_FRONTEND"
    )}\/auth\/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      user.email!
    )}\n\n
    If you did not request this, please ignore this email.\n
    `,
  };

  // Send the email.
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res
        .status(500)
        .json(errorResponse("Error while sending verification email."));
    } else {
      res
        .status(200)
        .json(successResponse("User verification email sent.", {}));
    }
  });
};

const sendEmailVerificationLinkMethods = { POST };
export default sendEmailVerificationLinkMethods;
