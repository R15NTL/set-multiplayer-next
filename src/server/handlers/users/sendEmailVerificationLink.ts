import jwt from "jsonwebtoken";
// Services
import { transporter } from "@/server/auth/services/nodeMailer";
// Utils
import { getEnv } from "@/utils";
import { errorResponse, successResponse } from "@/server/utils/utils";
// Types
import { NextApiRequest, NextApiResponse } from "next";
import { CustomSession } from "@/server/types/session";

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: CustomSession
) => {
  if (!user) {
    res.status(401).json(errorResponse("Unauthorized"));
    return;
  }

  if (user.email_verified) {
    res.status(400).json(errorResponse("Email already verified."));
    return;
  }

  // Create a verification token.
  const verificationToken = jwt.sign(
    { userID: user.user_id },
    getEnv("JWT_SECRET_KEY"),
    { expiresIn: "24h" }
  );

  // Email options.
  const mailOptions = {
    from: getEnv("NODEMAILER_EMAIL_PROVIDER_SENDER"),
    to: user.email,
    subject: "Account Verification",
    text: `Please verify your account by clicking the following link: \n${getEnv(
      "BASE_URL_FRONTEND"
    )}\/verify\/${verificationToken}\n\n`,
  };

  // Send the email.
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json(errorResponse("Error while sending verification email."));
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json(successResponse("User verification email sent.", {}));
    }
  });
};

const sendEmailVerificationLinkMethods = { POST };
export default sendEmailVerificationLinkMethods;
