import nodemailer from "nodemailer";
import { getEnv } from "@/utils";

export const transporter = nodemailer.createTransport({
  service: getEnv("NODEMAILER_EMAIL_PROVIDER"),
  auth: {
    user: getEnv("NODEMAILER_EMAIL_PROVIDER_USER"),
    pass: getEnv("NODEMAILER_APP_PASSWORD"),
  },
});
