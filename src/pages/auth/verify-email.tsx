import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Services
import { useVerifyEmail } from "@/services/mutations/account";
import { useGetAccount } from "@/services/queries/account";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
// Auth
import { useSession } from "next-auth/react";
// Paths
import { paths } from "@/routes/paths";

VerifyEmail.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function VerifyEmail() {
  const queryClient = useQueryClient();
  const { query, replace } = useRouter();
  const { status } = useSession();

  // React Query
  const { mutate: verifyEmail, isLoading: isVerifying } = useVerifyEmail();
  const { data: account } = useGetAccount();

  // State
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Params
  const email = String(query.email);
  const token = String(query.token);

  // Handlers
  const handleVerifyEmail = async () => {
    verifyEmail(
      { token },
      {
        onSuccess: () => {
          setSuccess(true);
          queryClient.invalidateQueries(["get-account"]);
          if (status !== "authenticated") {
            replace(paths.auth.signIn.root);
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error?.response?.data?.data?.message) {
              return setError(error?.response?.data?.data?.message);
            }
            return setError(error.message);
          }
          setError("Something went wrong");
        },
      }
    );
  };

  useEffect(() => {
    if (status === "authenticated" && account?.email_verified) {
      replace(paths.menu);
    }
  }, [status, account]);

  if (success)
    return (
      <div className="flex flex-col gap-5 w-full max-w-lg m-auto text-center items-center">
        <Icon icon="tabler:mail-check" className="h-28 w-28 text-muted" />

        <h1 className="font-medium">Email verified!</h1>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg m-auto text-center items-center">
      <Icon icon="tabler:mail-check" className="h-28 w-28 text-muted" />

      <h1 className="font-medium">Email verification</h1>

      <Button
        onClick={handleVerifyEmail}
        className="mt-3"
        loading={isVerifying}
      >
        Verify {email}
      </Button>
      {error && (
        <div>
          <Alert variant="destructive">
            <AlertDescription>Error: {error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
