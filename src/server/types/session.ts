import { Session } from "next-auth";

export type CustomSession = Session & {
  user?: {
    email?: string;
    name?: string;
    image?: string;
  };
  email?: string;
  email_verified: boolean;
  name: string;
  user_id: string;
};
