import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSendVerificationEmail } from "@/services/mutations/account";
import { Button } from "@/components/ui/button";

interface AccountCreatedProps {
  email: string;
}

export default function AccountCreated({ email }: AccountCreatedProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isError, setIsError] = useState(false);

  const { mutate: sendVerificationEmail } = useSendVerificationEmail();

  const handleSendVerificationEmail = (email: string) => {
    sendVerificationEmail(
      {
        email,
      },
      {
        onSuccess: () => {
          setEmailSent(true);
        },
        onError: () => {
          setIsError(true);
        },
      }
    );
  };

  useEffect(() => {
    handleSendVerificationEmail(email);
  }, []);

  const handleResendEmailVerification = () => {
    setIsError(false);
    handleSendVerificationEmail(email);
  };

  if (emailSent)
    return (
      <div className="flex flex-col m-auto w-full max-w-md gap-10 text-center items-center pb-5">
        <Icon
          icon="streamline:mail-send-email-send-email-paper-airplane"
          className="h-28 w-28 text-muted"
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Email verification link sent</h1>

          <p className="text-sm">
            We have sent an email verification link to {email}. Please follow
            the instructions in the email to verify your account.
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col m-auto w-full max-w-md gap-10 text-center items-center pb-5">
        <Icon icon="tabler:alert-hexagon" className="h-28 w-28 text-muted" />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Account created</h1>
          <p className="text-sm">
            We encountered an error while sending a verification link to {email}
            .
          </p>
        </div>
        <div className="mt-3">
          <Button onClick={handleResendEmailVerification}>
            Resend verification link
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col m-auto w-full max-w-md gap-5 text-center items-center pb-5">
      <Icon
        icon="svg-spinners:3-dots-bounce"
        className="h-16 w-16 text-muted"
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-medium">Please wait...</h1>
      </div>
    </div>
  );
}
