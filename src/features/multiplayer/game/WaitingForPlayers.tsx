import React, { useEffect } from "react";
import { useRouter } from "next/router";
// Paths
import { paths } from "@/routes/paths";
// Components
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";

export default function WaitingForPlayers() {
  const { currentRoom, socket } = useSocket();

  const { replace } = useRouter();

  useEffect(() => {
    if (!currentRoom) {
      replace(paths.multiplayer.lobby.root);
    }
  }, [currentRoom]);

  const hostId = currentRoom?.host.user_id;

  const handleStartGame = () => {
    const playersToRemove: string[] = [];

    emitters.lobby.startGame(
      { players_to_remove: playersToRemove },
      (...args) => socket.emit(...args)
    );
  };

  return (
    <Card className="m-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Waiting for players</CardTitle>
        <CardDescription>Room: {currentRoom?.room_name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Card className="h-32"></Card>
          <Card className="h-32"></Card>
          <Card className="h-32"></Card>
          <Card className="h-32"></Card>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartGame}>Start game</Button>
      </CardFooter>
    </Card>
  );
}
