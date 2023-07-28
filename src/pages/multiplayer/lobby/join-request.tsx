import React, { useEffect } from "react";
import SocketGuard from "@/services/socket/SocketGuard";
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

JoinRequest.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

export default function JoinRequest() {
  const { socket } = useSocket();

  const onJoinRequestAccepted = () => {
    emitters.game.common.playerAcceptJoinRequest((...args) =>
      socket.emit(...args)
    );
  };

  useEffect(() => {
    socket.on("join-request-accepted", onJoinRequestAccepted);

    return () => {
      socket.off("join-request-accepted", onJoinRequestAccepted);
    };
  }, []);
  return <div>join-request</div>;
}
