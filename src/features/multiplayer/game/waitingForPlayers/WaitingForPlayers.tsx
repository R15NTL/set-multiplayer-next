import React, { useEffect } from "react";
import { useRouter } from "next/router";
// Paths
import { paths } from "@/routes/paths";
// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
// Local
import PlayerCard from "./PlayerCard";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Account
import { useGetAccount } from "@/services/queries/account";

export default function WaitingForPlayers() {
  const { currentRoom, socket, isHost } = useSocket();
  const { data: account } = useGetAccount();

  const { replace } = useRouter();

  useEffect(() => {
    if (!currentRoom) {
      replace(paths.multiplayer.lobby.root);
    }
  }, [currentRoom]);

  const hostId = currentRoom?.host.user_id;

  const sortedPlayers =
    currentRoom?.room_players?.sort((a, b) => {
      if (a.user.user_id === account?.user_id) {
        return -1;
      }
      return a.user.username.localeCompare(b.user.username);
    }) ?? [];

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
          <PlayerCard
            name={sortedPlayers[0]?.user?.username}
            id={sortedPlayers[0]?.user?.user_id}
          />
          <PlayerCard
            name={sortedPlayers[1]?.user?.username}
            id={sortedPlayers[1]?.user?.user_id}
          />
          <PlayerCard
            name={sortedPlayers[2]?.user?.username}
            id={sortedPlayers[2]?.user?.user_id}
          />
          <PlayerCard
            name={sortedPlayers[3]?.user?.username}
            id={sortedPlayers[3]?.user?.user_id}
          />
        </div>
      </CardContent>
      <CardFooter>
        {isHost && <Button onClick={handleStartGame}>Start game</Button>}
      </CardFooter>
    </Card>
  );
}
