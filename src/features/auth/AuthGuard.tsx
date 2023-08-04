import React from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useGetAccount } from "@/services/queries/account";
import SignIn from "./signIn/SignIn";
const LoadingScreen = dynamic(
  () => import("@/components/loading-screen/LoadingScreen")
);

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
    return <LoadingScreen />;
  }
  return <>{children}</>;
}
