import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { replace, query } = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      replace(query.redirect ? query.redirect.toString() : paths.menu);
    }
  }, [status]);

  return <>{children}</>;
}
