import React, { useEffect } from "react";
// Next
import { useRouter } from "next/router";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Routes
import { paths, apiRoutes } from "@/routes/paths";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
import SocketGuard from "@/services/socket/SocketGuard";
// Services
import { useAxios } from "@/hooks/useAxios";

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

  const handleJoinRoom = async (roomId: string) => {
    console.log("Joining room");
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
    if (!!room_id && isConnected) handleJoinRoom(room_id);
  }, [room_id, isConnected]);

  useEffect(() => {}, []);

  return <div className="m-auto">Connecting...</div>;
}
