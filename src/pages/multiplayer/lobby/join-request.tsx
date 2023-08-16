import React, { useEffect } from "react";
// Next
import Head from "next/head";
// Socket
import SocketGuard from "@/services/socket/SocketGuard";
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Icons
import { Icon } from "@iconify/react";

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
  return (
    <>
      <Head>
        <title>Join request | Set Multiplayer</title>
      </Head>
      <div className=" w-full max-w-lg text-center align-middle items-center m-auto flex flex-col gap-5">
        <Icon icon="svg-spinners:pulse" className="text-muted h-24 w-24" />
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Join request sent!</h1>
          <p className="text-sm">
            Waiting for the host to accept your join request
          </p>
        </div>
      </div>
    </>
  );
}
