import React, { useEffect, useRef } from "react";
// Next
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Routes
import { apiRoutes } from "@/routes/paths";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
import SocketGuard from "@/services/socket/SocketGuard";
// Services
import { useAxios } from "@/hooks/useAxios";
// Loading screen
const LoadingScreen = dynamic(
  () => import("@/components/loading-screen/LoadingScreen")
);

JoinRoom.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

export default function JoinRoom() {
  const { query } = useRouter();
  const { axiosInstance } = useAxios();
  const { socket, isConnected } = useSocket();
  const room_id = query.room_id as string;

  const isSentRef = useRef(false);

  const handleJoinRoom = async (roomId: string) => {
    try {
      const data = await axiosInstance.get(apiRoutes.ioTokens.root);
      const token = data.data.data.data.token;

      emitters.lobby.joinRoom({ roomId, token }, (...args) =>
        socket.emit(...args)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSentRef.current) return;

    if (room_id && isConnected) {
      isSentRef.current = true;
      handleJoinRoom(room_id);
    }
  }, [room_id, isConnected]);

  return (
    <>
      <Head>
        <title>Join Room | Set Multiplayer</title>
      </Head>
      <LoadingScreen />
    </>
  );
}
