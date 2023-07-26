import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
import { paths } from "@/routes/paths";
import { emitters } from "@/services/socket/emitters";
import SocketGuard from "@/services/socket/SocketGuard";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

AddedToRoom.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

export default function AddedToRoom() {
  const { replace, query } = useRouter();
  const { currentRoom, socket } = useSocket();

  useEffect(() => {
    if (currentRoom && query.room_id === currentRoom.room_id) {
      replace({
        pathname: paths.multiplayer.game.root,
      });
    } else {
      emitters.common.requestRoomData((...args) => socket.emit(...args));
    }
  }, [currentRoom]);

  return <div>Connecting...</div>;
}
