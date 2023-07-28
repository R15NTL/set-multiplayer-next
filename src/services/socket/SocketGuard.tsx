import React, { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";

interface SocketGuardProps {
  children: React.ReactNode;
}

export default function SocketGuard({ children }: SocketGuardProps) {
  return <>{children}</>;
}
