import React from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useGetAccount } from "@/services/queries/account";
// Components
import EmailNotVerified from "./EmailNotVerified";

const LoadingScreen = dynamic(
  () => import("@/components/loading-screen/LoadingScreen")
);

interface EmailVerifiedGuardProps {
  children: React.ReactNode;
}

export default function EmailVerifiedGuard({
  children,
}: EmailVerifiedGuardProps) {
  const { data: session, status } = useSession();
  const { data: account, isLoading } = useGetAccount();

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return <LoadingScreen />;
  }

  if (account?.email_verified === false) {
    return <EmailNotVerified email={account.email} />;
  }

  return <>{children}</>;
}
