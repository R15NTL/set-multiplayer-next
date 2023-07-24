import React, { useState, useMemo } from "react";
// Next
import Link from "next/link";
// Routes
import { paths } from "@/routes/paths";
// Icons
import { Icon } from "@iconify/react";
// Form
import * as yup from "yup";
// Components
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth
import GuestGuard from "@/features/auth/GuestGuard";
// Services
import { useSendPasswordResetLink } from "@/services/mutations/account";
import { AxiosError } from "axios";
import { XOctagon } from "lucide-react";

ForgotPasswordSend.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <GuestGuard>{page}</GuestGuard>
  </MainLayout>
);

const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
});

export default function ForgotPasswordSend() {
  const { mutate: sendPasswordResetLink, isLoading: isSendingLink } =
    useSendPasswordResetLink();

  // State
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  // Handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSendResetPasswordEmail = () => {
    try {
      resetPasswordSchema.validateSync({ email });
    } catch (err) {
      if (err instanceof yup.ValidationError) return setError(err.message);

      return setError("Please enter a valid email address");
    }

    sendPasswordResetLink(
      { email },
      {
        onSuccess: () => {
          setIsSent(true);
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            if (err?.response?.data?.data?.message) {
              setError(err?.response?.data?.data?.message);
              return;
            }

            setError(err.message);
            return;
          }
          setError("Something went wrong.");
          return;
        },
      }
    );
  };

  if (isSent)
    return (
      <div className=" w-full max-w-lg text-center align-middle items-center m-auto flex flex-col gap-5">
        <Icon
          icon="streamline:mail-send-email-send-email-paper-airplane"
          className="text-muted h-24 w-24"
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Email sent!</h1>
          <p className="text-sm">We've sent a password reset link to {email}</p>
        </div>
      </div>
    );

  return (
    <>
      <div className=" w-full max-w-lg text-center align-middle items-center m-auto flex flex-col gap-5">
        <Icon icon="tabler:lock-question" className="text-muted h-24 w-24" />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Forgot password?</h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm mb-1">Please enter your email address</p>
            <Input
              disabled={isSendingLink}
              onFocus={() => setError(null)}
              placeholder="me@example.com"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {error && (
              <p className="text-xs text-destructive self-start">{error}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Button
            loading={isSendingLink}
            onClick={handleSendResetPasswordEmail}
          >
            Send reset link
          </Button>
        </div>
      </div>
    </>
  );
}
