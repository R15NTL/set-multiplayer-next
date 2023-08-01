import React, { useState } from "react";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Button } from "@/components/ui/button";
// Services
import { useSendVerificationEmail } from "@/services/mutations/account";

interface EmailNotVerifiedProps {
  email: string;
}

export default function EmailNotVerified({ email }: EmailNotVerifiedProps) {
  const [isSent, setIsSent] = useState(false);

  const { mutate: sendVerificationEmail, isLoading: isSendingEmail } =
    useSendVerificationEmail();

  const handleSendVerificationEmail = () => {
    sendVerificationEmail(
      {
        email,
      },
      {
        onSuccess: () => {
          setIsSent(true);
        },
      }
    );
  };

  if (isSent) {
    return (
      <div className="flex flex-col m-auto w-full max-w-md gap-10 text-center items-center pb-5">
        <Icon
          icon="streamline:mail-send-email-send-email-paper-airplane"
          className="h-28 w-28 text-muted"
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Email sent!</h1>

          <p className="text-sm">
            We have sent a verification link to {email}. This link is valid for
            30 minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-auto w-full max-w-md gap-5 text-center items-center pb-5">
      <Icon icon="tabler:mail-check" className="h-28 w-28 text-muted" />
      <div className="flex flex-col gap-3">
        <h1 className="font-medium">Please verify your email address</h1>

        <p className="text-sm">Send a verification link to {email}</p>
      </div>

      <div className="mt-3">
        <Button
          onClick={handleSendVerificationEmail}
          className=""
          loading={isSendingEmail}
        >
          Send verification link
        </Button>
      </div>
    </div>
  );
}
