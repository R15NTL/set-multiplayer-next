import React from "react";
import { useSession } from "next-auth/react";
import { useGetAccount } from "@/services/queries/account";
import SignIn from "./signIn/SignIn";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const { data: account, isLoading, isSuccess } = useGetAccount();

  if (status === "unauthenticated") {
    return <SignIn />;
  }

  if (status === "loading" || isLoading) {
    return <div>Connecting...</div>;
  }
  return <>{children}</>;
}
