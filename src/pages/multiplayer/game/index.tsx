import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/hooks/useSocket";
import SocketGuard from "@/services/socket/SocketGuard";
// Paths
import { paths } from "@/routes/paths";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Features
import WaitingForPlayers from "@/features/multiplayer/game/waitingForPlayers/WaitingForPlayers";
import GameRoom from "@/features/multiplayer/game/gameRoom/GameRoom";

Game.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>
      <SocketGuard>{page}</SocketGuard>
    </AuthGuard>
  </MainLayout>
);

export default function Game() {
  const { replace } = useRouter();
  const { currentRoom } = useSocket();

  useEffect(() => {
    if (!currentRoom) {
      replace(paths.multiplayer.lobby.root);
    }
  }, [currentRoom]);

  if (currentRoom?.game_status === "waiting-for-players") {
    return <WaitingForPlayers />;
  }

  return <GameRoom />;
}
