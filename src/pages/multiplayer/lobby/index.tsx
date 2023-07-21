import React from "react";
import { useSocket } from "@/hooks/useSocket";
import { Button } from "@/components/button";
import { paths } from "@/routes/paths";
// Auth guard
import AuthGuard from "@/features/auth/AuthGuard";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

Lobby.getLayout = (page: React.ReactNode) => (
  <MainLayout>
    <AuthGuard>{page}</AuthGuard>
  </MainLayout>
);

export default function Lobby() {
  const { lobbyRooms } = useSocket();
  return (
    <div>
      <h1>Lobby</h1>
      <ul>
        {lobbyRooms.map((room) => (
          <li>
            {room.name}, Players: {room.playerCount}
          </li>
        ))}
      </ul>
      <Button href={paths.multiplayer.lobby.createRoom.root}>
        Create room
      </Button>
    </div>
  );
}
