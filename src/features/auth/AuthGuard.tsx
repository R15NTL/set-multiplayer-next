import React from "react";
import { useSession } from "next-auth/react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <div>Login</div>;
  }

  if (status === "loading") {
    return <div>Connecting...</div>;
  }
  return <>{children}</>;
}
