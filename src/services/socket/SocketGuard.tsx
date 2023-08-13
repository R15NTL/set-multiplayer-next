import React, { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";
// Components
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

interface SocketGuardProps {
  children: React.ReactNode;
}

export default function SocketGuard({ children }: SocketGuardProps) {
  const { isConnected } = useSocket();

  if (!isConnected)
    return (
      <div className="m-auto grid gap-5 text-center items-center">
        <LoadingScreen />

        <p className="font-medium">Connecting...</p>
      </div>
    );

  return <>{children}</>;
}
