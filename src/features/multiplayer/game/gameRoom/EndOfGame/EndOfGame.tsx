import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/button";
// Features
import SetTable from "@/features/setTable";
import InGamePlayerCard from "../InGame/inGamePlayerCard";
import StartNewRound from "./StartNewRound";
// Socket
import { useSocket } from "@/hooks/useSocket";
import { emitters } from "@/services/socket/emitters";
// Account
import { useGetAccount } from "@/services/queries/account";
// Gamelogic
import GameLogic from "@/features/gameLogic/gameLogic";

export default function EndOfGame() {
  const { currentRoom, socket, isHost } = useSocket();

  const sortedPlayers =
    currentRoom?.room_players?.sort((a, b) => {
      if (a.score === b.score)
        return a.user.username.localeCompare(b.user.username);

      return b.score - a.score;
    }) ?? [];

  const playersInGame =
    currentRoom?.room_players?.filter((player) => player.status === "player") ??
    [];

  return (
    <Card className="m-auto flex flex-col w-full max-w-lg">
      <CardHeader>
        <CardTitle>End of game</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        {sortedPlayers.map((player, index) => (
          <Card key={player.user.user_id} className="flex flex-col">
            <h6>{player.user.username}</h6>
            <p>Score: {player.score}</p>
          </Card>
        ))}
      </CardContent>
      <CardFooter>{isHost && <StartNewRound />}</CardFooter>
    </Card>
  );
}
